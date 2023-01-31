import "./Auth.scss"
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaGithubSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const navigate = useNavigate()
    const handleClickBtnRegister = () => {
        navigate("/register")
    }
    return (
        <div className="auth-container">
            <form>
                <h2 className="title mb-4">LOGIN</h2>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">Email address:</label>
                    <input type="email" id="form2Example1" className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">Password:</label>
                    <input type="password" id="form2Example2" className="form-control" />
                </div>
                <button type="button " className="btn btn-primary btn-block mb-4 sign-in">Sign in</button>

                <div className="row mb-4">
                    <div className="col-6 d-flex mb-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>


                <div className="text-center">
                    <p onClick={() => handleClickBtnRegister()}>Not a member? <span>Register</span> </p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaFacebookSquare />
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaInstagramSquare />
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaTwitterSquare />
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaGithubSquare />
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Login