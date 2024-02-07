import clsx from 'clsx';
import PropTypes from 'prop-types';

import ReleaseNoteList from 'components/pages/changelog/changelog-list';
import Hero from 'components/pages/changelog/hero';
import Breadcrumbs from 'components/pages/doc/breadcrumbs';
import DocFooter from 'components/pages/doc/doc-footer';
import PreviousAndNextLinks from 'components/pages/doc/previous-and-next-links';
import TableOfContents from 'components/pages/doc/table-of-contents';
// import Pagination from 'components/pages/changelog/pagination';
// import ChangelogFilter from 'components/pages/changelog/changelog-filter';
import Content from 'components/shared/content';
import { DOCS_BASE_PATH } from 'constants/docs';

// TODO: Add pagination for changelog
const Changelog = ({
  // currentSlug,
  items,
}) => (
  <>
    <Hero />
    {/* <ChangelogFilter currentSlug={currentSlug} /> */}
    <ReleaseNoteList className="mt-4" items={items} />
    {/* {pageCount > 1 && <Pagination currentPageIndex={currentPageIndex} pageCount={pageCount} />} */}
  </>
);

Changelog.propTypes = {
  // currentSlug: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Post = ({
  data: { title, subtitle, enableTableOfContents = false, updatedOn = null },
  content,
  breadcrumbs,
  navigationLinks: { previousLink, nextLink },
  isChangelog = false,
  changelogPosts = [],
  currentSlug,
  fileOriginPath,
  tableOfContents,
}) => {
  const lastUpdatedOn = updatedOn
    ? new Date(updatedOn).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <>
      <div
        className={clsx(
          'col-span-6 -mx-10 flex flex-col 2xl:col-span-7 2xl:mx-5 xl:col-span-9 xl:ml-11 xl:mr-0 xl:max-w-[750px] lg:ml-0 lg:max-w-none lg:pt-0 md:mx-auto md:pb-[70px] sm:pb-8'
        )}
      >
        {breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        {isChangelog ? (
          <Changelog currentSlug={currentSlug} items={changelogPosts} />
        ) : (
          <article>
            <h1 className="text-[36px] font-semibold leading-tight xl:text-3xl">{title}</h1>
            {subtitle && (
              <p className="my-2 text-xl leading-tight text-gray-new-40 dark:text-gray-new-80">
                {subtitle}
              </p>
            )}
            <Content className="mt-5" content={content} />
            {lastUpdatedOn && (
              <p className="mt-10 text-sm text-gray-new-40 dark:text-gray-new-80">
                Last updated on <time dateTime={updatedOn}>{lastUpdatedOn}</time>
              </p>
            )}
          </article>
        )}

        {!isChangelog && (
          <PreviousAndNextLinks
            previousLink={previousLink}
            nextLink={nextLink}
            basePath={DOCS_BASE_PATH}
          />
        )}
        <DocFooter fileOriginPath={fileOriginPath} slug={currentSlug} />
      </div>

      <div className={clsx('col-start-11 col-end-13 -ml-11 h-full 2xl:ml-0 xl:hidden')}>
        <nav className="no-scrollbars sticky bottom-10 top-[104px] max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden">
          {enableTableOfContents && <TableOfContents items={tableOfContents} />}
        </nav>
      </div>
    </>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    enableTableOfContents: PropTypes.bool,
    updatedOn: PropTypes.string,
  }).isRequired,
  content: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigationLinks: PropTypes.exact({
    previousLink: PropTypes.shape({}),
    nextLink: PropTypes.shape({}),
  }).isRequired,
  isChangelog: PropTypes.bool,
  changelogPosts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  currentSlug: PropTypes.string.isRequired,
  fileOriginPath: PropTypes.string.isRequired,
  tableOfContents: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Post;
