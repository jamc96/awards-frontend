import { getStrapiUrl } from "../../../utils/api";
const Image = ({ className, url, alternativeText }) =>
  url ? (
    <img className={className} src={getStrapiUrl(url)} alt={alternativeText} />
  ) : null;

export default Image;