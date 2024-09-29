import React from "react";
import SideNavBar from "../../components/sideNavBar/sideNavBar";

const MyProfile = () => {
    return (
        <div className="columns">
            <SideNavBar />
            <div className="column is-10">resto de la página</div>
        </div>
    );
};

export default MyProfile;