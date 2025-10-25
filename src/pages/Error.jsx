import Wrapper from "../assets/wrappers/ErrorPage";
import { Link , useRouteError } from "react-router-dom";
import img from "../assets/not-found.svg";
const Error = () => {

  const error = useRouteError();
  console.log(error);
  if(error.status == 404){
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>ohhh!</h3>
          <p>We cant seem to find the page your are looking for</p>
        </div>
      </Wrapper>
    );
  }
  return <Wrapper>oops!! something went wrong </Wrapper>;
}

export default Error
