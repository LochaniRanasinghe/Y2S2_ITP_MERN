import "./App.css";
import FootCom from "./components/Footer/FootCom";
import HeadCom from "./components/Header/HeadCom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainOtherIncome from "./components/FinancialManagement/OtherIncome/MainOtherIncome";
import MainOtherExpen from "./components/FinancialManagement/OtherExpen/MainOtherExpen";
import UpdateDeleteOtherIncome from "./components/FinancialManagement/OtherIncome/UpdateDeleteOtherIncome";
import UpdateDeleteOtherExpen from "./components/FinancialManagement/OtherExpen/UpdateDeleteOtherExpen";
import MainFinStat from "./components/FinancialManagement/Statics/MainFinStat";
import LandingPage from "./components/LandingPage/LandingPage";
import PrintOtherIncom from "./components/FinancialManagement/OtherIncome/PrintOtherIncom";
import PrintOtherExpen from "./components/FinancialManagement/OtherExpen/PrintOtherExpen";
import MainItem from "./components/InventoryManagement/Items/MainItem";
import UpdateDeleteItem from "./components/InventoryManagement/Items/UpdateDeleteItem";
import ViewItem from "./components/InventoryManagement/Items/ViewItem";
import AddItem from "./components/InventoryManagement/Items/AddItem";
import AddProduct from "./components/InventoryManagement/Products/AddProduct";
import MainProduct from "./components/InventoryManagement/Products/MainProduct";
import UpdateDeleteProduct from "./components/InventoryManagement/Products/UpdateDeleteProduct";
import ViewProduct from "./components/InventoryManagement/Products/ViewProduct";
import MainAdminDetails from "./components/BranchManagement/AdminDetailsManagement/MainAdminDetails";
import AddNewAdmin from "./components/BranchManagement/AdminDetailsManagement/AddNewAdmin";
import UpdateAdminDetails from "./components/BranchManagement/AdminDetailsManagement/UpdateAdminDetails";
import MainBranchDetails from "./components/BranchManagement/BranchDetailsManagement/MainBranchDetails";
import UpdateBranchDetails from "./components/BranchManagement/BranchDetailsManagement/UpdateBranchDetails";
import AddNewBranch from "./components/BranchManagement/BranchDetailsManagement/AddNewBranch";
import MainPromReport from "./components/PromotionalManagement/AnalyzeTotalDiscount/MainPromReport";
import ViewPromReport from "./components/PromotionalManagement/AnalyzeTotalDiscount/ViewPromReport";
import UpdatePromReport from "./components/PromotionalManagement/AnalyzeTotalDiscount/UpdatePromReport";
import ViewPromotions from "./components/PromotionalManagement/PublishOffers/ViewPromotions";
import UpdatePromotions from "./components/PromotionalManagement/PublishOffers/UpdatePromotions";
import MainPromotionPage from "./components/PromotionalManagement/PublishOffers/MainPromotionPage";
import PromoPDFPrint from "./components/PromotionalManagement/AnalyzeTotalDiscount/PromoPDFPrint";

import MainInvoiceDetails from "./components/SupplierManagement/InvoiceDetailsManagement/MainInvoiceDetails";
import UpdateInvoiceDetails from "./components/SupplierManagement/InvoiceDetailsManagement/UpdateInvoiceDetails";
import AddInvoiceDetails from "./components/SupplierManagement/InvoiceDetailsManagement/AddInvoiceDetails";
import DeleteInvoiceDetails from "./components/SupplierManagement/InvoiceDetailsManagement/DeleteInvoiceDetails";
import MainSupplierDetails from "./components/SupplierManagement/SupplierDetailsManagement/MainSupplierDetails";
import UpdateSupplierDetails from "./components/SupplierManagement/SupplierDetailsManagement/UpdateSupplierDetails";
import DeleteSupplierDetails from "./components/SupplierManagement/SupplierDetailsManagement/DeleteSupplierDetails";
import AddSupplierDetails from "./components/SupplierManagement/SupplierDetailsManagement/AddSupplierDetails";
import PrintInvoiceDetails from "./components/SupplierManagement/InvoiceDetailsManagement/PrintInvoiceDetails";

import GetAllCustomerDetails from "./components/CustomerManagement/customerdetails/GetAllCustomerDetails";
import GetAllCustomerBil from "./components/CustomerManagement/customerbilldetails/GetAllCustomerBil";
import UpdateDeleteCustomer from "./components/CustomerManagement/customerdetails/UpdateDeleteCustomer";
import MainCustomerDetails from "./components/CustomerManagement/customerdetails/MainCustomerDetails";
import MainCustomerBill from "./components/CustomerManagement/customerbilldetails/MainCustomerBill";
import UpdateDeleteCustomerBills from "./components/CustomerManagement/customerbilldetails/UpdateDeleteCustomerBills";
import CustomerBillPrint from "./components/CustomerManagement/customerbilldetails/CustomerBillPrint";

import AddEmployee from "./components/EmployeeManagement/AddEmployee";
import EmployeeMain from "./components/EmployeeManagement/EmployeeMain";
import LeavesMain from "./components/EmployeeManagement/LeavesMain";
import SalaryMain from "./components/EmployeeManagement/SalaryMain";
import UpdateEmployee from "./components/EmployeeManagement/UpdateEmployee";
import UpdateLeave from "./components/EmployeeManagement/UpdateLeave";
import AllLeaves from "./components/EmployeeManagement/AllLeaves";
import AddLeave from "./components/EmployeeManagement/AddLeave";
import AllEmployees from "./components/EmployeeManagement/AllEmployees";
import AllSalaries from "./components/EmployeeManagement/AllSalaries";
import AddSalary from "./components/EmployeeManagement/AddSalary";
import UpdateSalary from "./components/EmployeeManagement/UpdateSalary";
import DownloadEmployee from "./components/EmployeeManagement/DownloadEmployee";
import SalaryReportMain from "./components/EmployeeManagement/SalaryReportMain";
import SalaryCalculation from "./components/EmployeeManagement/SalaryCalculation";

import WarrantyClaim from "./components/ServicesManagement/MainClaimPage";
import AddClaim from "./components/ServicesManagement/AddClaim";
import UpdateClaim from "./components/ServicesManagement/UpdateClaim";
import MainSerStatic from "./components/ServicesManagement/SerStatic/MainSerStatic";
import PrintClaim from "./components/ServicesManagement/PrintClaim";
import LoginPgae from "./components/Login/LoginPgae";
import EmpReportMain from "./components/EmployeeManagement/EmpReportMain";
import EmpCalculation from "./components/EmployeeManagement/EmpCalculation";

function App() {
  return (
    <BrowserRouter>
      <body className="mainbody">
        <HeadCom />

        {/* main page  */}

        <main className="mainbg">
          <Routes>
            {/* Abishek Routes............................................................................................... */}
            <Route path="/otherincome" element={<MainOtherIncome />} />
            <Route path="/otherexpen" element={<MainOtherExpen />} />
            <Route
              path="/otherincome/update/:id"
              element={<UpdateDeleteOtherIncome />}
            />
            <Route
              path="/otherincome/print/:id"
              element={<PrintOtherIncom />}
            />
            <Route
              path="/otherexpen/update/:id"
              element={<UpdateDeleteOtherExpen />}
            />

            <Route path="/otherexpen/print/:id" element={<PrintOtherExpen />} />

            <Route path="/financestat" element={<MainFinStat />} />
            {/* .............................................................................................................................. */}

            {/* Hasini Routes -> Inventory Management....................................................................... */}
            {/* .....Product Details..... */}
            <Route path="/productdetails" element={<MainProduct />} />
            <Route
              path="/productdetails/update/:id"
              element={<UpdateDeleteProduct />}
            />
            <Route
              path="/productdetails/update/:id"
              element={<UpdateDeleteProduct />}
            />
            <Route path="/productdetails/view" element={<ViewProduct />} />
            <Route path="/productdetails/add" element={<AddProduct />} />
            {/* <Route path="/productdetails/print/:id" element={<PrintProduct/>}/> */}

            {/* .....Item Details..... */}
            <Route path="/itemdetails" element={<MainItem />} />
            <Route
              path="/itemdetails/update/:id"
              element={<UpdateDeleteItem />}
            />
            <Route
              path="/itemdetails/update/:id"
              element={<UpdateDeleteItem />}
            />
            <Route path="/itemdetails/view" element={<ViewItem />} />
            <Route path="/itemdetails/add" element={<AddItem />} />
            {/* ............................................................................................................ */}

            {/* Sakuni Routes............................................................................................... */}

            <Route path="/branchdetails" element={<MainBranchDetails />} />
            <Route
              path="/branchdetails/update/:id"
              element={<UpdateBranchDetails />}
            />
            <Route path="/branchdetails/add" element={<AddNewBranch />} />

            <Route path="/admindetails" element={<MainAdminDetails />} />
            <Route path="/admindetails/add" element={<AddNewAdmin />} />
            <Route
              path="/admindetails/update/:id"
              element={<UpdateAdminDetails />}
            />
            {/*Lochi Routes.......*/}

            <Route path="/mainpromotionpage" element={<MainPromotionPage />} />

            <Route path="/mainpromreport" element={<MainPromReport />} />

            <Route
              path="/mainpromotionpage/viewpromo"
              element={<ViewPromotions />}
            />

            <Route
              path="/mainpromotionpage/updatepromo"
              element={<UpdatePromotions />}
            />

            <Route
              path="/mainpromotionpage/updatepromo/:id"
              element={<UpdatePromotions />}
            />

            <Route
              path="/mainpromreport/viewpReport"
              element={<ViewPromReport />}
            />

            <Route
              path="/mainpromotionpage/updatePreport"
              element={<UpdatePromReport />}
            />

            <Route
              path="/mainpromotionpage/updatePreport/:id"
              element={<UpdatePromReport />}
            />

            <Route
              path="/mainpromotionpage/printPreport/:id"
              element={<PromoPDFPrint />}
            />

            {/* getallcustomerdetails */}
            <Route
              path="/getallcustomerdetails"
              element={<GetAllCustomerDetails />}
            />

            <Route
              path="/maincustomerdetails/update/:id"
              element={<UpdateDeleteCustomer />}
            />
            <Route
              path="/maincustomerdetails"
              element={<MainCustomerDetails />}
            />
            {/* get all customerbills */}
            <Route
              path="/getallcustomerbills"
              element={<GetAllCustomerBil />}
            />
            <Route path="/maincustomerbill" element={<MainCustomerBill />} />
            <Route
              path="/maincustomerbill/update/:id"
              element={<UpdateDeleteCustomerBills />}
            />
            <Route
              path="/maincustomerbill/print/:id"
              element={<CustomerBillPrint />}
            />

            {/* .............................................................................................................................. */}

            <Route path="/supplierdetails" element={<MainSupplierDetails />} />
            <Route path="/invoicedetails" element={<MainInvoiceDetails />} />

            <Route
              path="/AllInvoiceDetails/update/:id"
              element={<UpdateInvoiceDetails />}
            />

            <Route
              path="/AllInvoiceDetails/add"
              element={<AddInvoiceDetails />}
            />

            <Route
              path="/AllInvoiceDetails/delete/:id"
              element={<DeleteInvoiceDetails />}
            />

            <Route
              path="/AllSupplierDetails/add"
              element={<AddSupplierDetails />}
            />

            <Route
              path="/AllSupplierDetails/update/:id"
              element={<UpdateSupplierDetails />}
            />

            <Route
              path="/AllSupplierDetails/delete/:id"
              element={<DeleteSupplierDetails />}
            />

            <Route
              path="/AllInvoiceDetails/print/:id"
              element={<PrintInvoiceDetails />}
            />

            {/* ..............................................................................................Login................................................ */}
            <Route path="/home" element={<LandingPage />} />
            <Route path="/" element={<LoginPgae />} />

            {/* ..............  Janani Routes  .............. */}

            <Route path="/employeemain" element={<EmployeeMain />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/allemployees" element={<AllEmployees />} />
            <Route
              path="/empEmployee/update/:id"
              exact
              element={<UpdateEmployee />}
            />
            <Route
              path="/empEmployee/print/:id"
              element={<DownloadEmployee />}
            />

            <Route path="/leavesmain" element={<LeavesMain />} />
            <Route path="/addleave" element={<AddLeave />} />
            <Route path="/allleaves" element={<AllLeaves />} />
            <Route
              path="/empLeave/update/:id"
              exact
              element={<UpdateLeave />}
            />

            <Route path="/salarymain" element={<SalaryMain />} />
            <Route path="/addsalary" element={<AddSalary />} />
            <Route path="/allsalaries" element={<AllSalaries />} />
            <Route
              path="/empSalary/update/:id"
              exact
              element={<UpdateSalary />}
            />

            <Route path="/salaryReportMain" element={<SalaryReportMain />} />
            <Route path="/salaryCalculation" element={<SalaryCalculation />} />

            <Route path="/empReportMain" element={<EmpReportMain />} />
            <Route path="/empCalculation" element={<EmpCalculation />} />

            {/* Sahan Routes............................................................................................... */}
            <Route path="/MainClaimPage" element={<WarrantyClaim />} />
            <Route path="/ClaimHome/AddClaim" element={<AddClaim />} />
            <Route
              path="/ClaimHome/UpdateClaim/:id"
              element={<UpdateClaim />}
            />
            <Route
              path="/ClaimHome/MainSerStatic"
              element={<MainSerStatic />}
            />
            <Route path="/ClaimHome/PrintClaim/:id" element={<PrintClaim />} />
            {/* .............................................................................................................................. */}
          </Routes>
        </main>
        <hr />
        <FootCom />
      </body>
    </BrowserRouter>
  );
}

export default App;
