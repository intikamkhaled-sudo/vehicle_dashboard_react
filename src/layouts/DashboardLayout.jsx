import Topbar from "../components/Navbar/Topbar";
import Sidebar from "../components/Sidebar/Sidebar";

function DashboardLayout({ children }) {

    return (

        <>

            <Topbar />

            <div className="app-shell">

                <Sidebar />

                <main className="main-content">

                    {children}

                </main>

            </div>

        </>

    );

}

export default DashboardLayout;