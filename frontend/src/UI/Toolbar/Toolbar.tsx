import { NavLink } from 'react-router-dom';

const Toolbar = () => {
    return (
        <nav className="navbar navbar-dark bg-body mb-4 ">
            <div className="container-fluid border-bottom d-flex justify-content-between">
                <div>
                    <NavLink className="navbar-brand text-black fw-bold" to="/">
                        News
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;
