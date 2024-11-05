import type { NextPage } from "next";
import HomeLayout from "@containers/home/HomeLayout";
import Layout from "../components/Layout";
import DataProvider from "../containers/home/DataProvider";

const Home: NextPage = () => {
  return (
    <Layout title="Settings">
      {/* // the title goes as the first prop while the children go as the second */}
      {/* context provider */}
      <DataProvider> 
        <HomeLayout />
      </DataProvider>
    </Layout>
  );
};

export default Home;
