import React from "react";

const DashboardPage = () => {
  return (
      <div className="admin-dashboard-page">
            <h1>Tableau de bord</h1>
            <h3>Bienvenue {} !</h3>

            <div className="dashboard">
                <div className="dashboard-card">
                    <h2>Nombre de produits</h2>
                    <p>0</p>
                </div>
                <div className="dashboard-card">
                    <h2>Nombre de commandes</h2>
                    <p>0</p>
                </div>
                <div className="dashboard-card">
                    <h2>Nombre de clients</h2>
                    <p>0</p>
                </div>
            </div>





      </div>
  );
}

export default DashboardPage;