import './App.css';
import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutImage from './assets/bg1.jpg'

const App = () => {
  return (
    <>
      <Header title='Title 0' descr='Here is our description' />
      <Layout title='Title 1' desc='First Layout' urlBg={LayoutImage} />
      <Layout title='Title 2' desc='Second Layout' colorBg='red' />
      <Layout title='Title 3' desc='Third Layout' urlBg={LayoutImage} />
      <Footer />
    </>
  );
}

export default App;
