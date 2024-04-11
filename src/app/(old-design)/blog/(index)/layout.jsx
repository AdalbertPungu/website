import Communities from 'components/pages/blog/communities';
import Sidebar from 'components/pages/blog/sidebar';
import Container from 'components/shared/container';
import Layout from 'components/shared/layout';
import { getAllWpBlogCategories } from 'utils/api-posts';

// eslint-disable-next-line react/prop-types
const BlogPageLayout = async ({ children }) => {
  const categories = await getAllWpBlogCategories();

  return (
    <Layout
      className="bg-black-new text-white"
      headerTheme="black-pure"
      footerTheme="black-pure"
      isBlogPage
      isHeaderSticky
    >
      <div className="safe-paddings bg-gray-new-8 pt-16 lt:pt-0">
        <Container className="grid grid-cols-12 gap-x-10 xl:gap-x-6 lt:gap-x-4" size="lg">
          <Sidebar categories={categories} />
          <div className="relative col-span-10 col-start-3 -mx-8 grid max-w-[1220px] gap-y-20 pb-40 2xl:mx-0 2xl:pl-16 xl:gap-y-16 xl:pb-32 lt:col-span-full lt:pl-0 lt:pt-8 lg:gap-y-20 lg:pb-28 md:pb-20">
            {children}
          </div>
        </Container>
      </div>
      <Communities />
    </Layout>
  );
};

export default BlogPageLayout;
