import Home from "~/components/Home";

export { getStaticProps } from "~/framework/rest/ssr/homepage/standard";

export default function index() {
  return <Home />;
}
