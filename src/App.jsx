import { useState } from "react";
import "./App.css";
import GridComponent from "./components/GridComponent";
import { PaginationProvider } from "./Context/PaginationContext";
import ServerSidePagination from "./components/ServerSidePagination";
import EditableToggle from "./components/EditableToggle";
function App() {
  const [isServerSideRendering, setisServerSideRendering] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [newRowData, setNewRowData] = useState({ name: "", amount: "" });
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setNewRowData({ name: "", amount: "" });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <EditableToggle isEditable={isEditable} setIsEditable={setIsEditable} />
      {/* <PaginationProvider>
        <ServerSidePagination
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          newRowData={newRowData}
          setNewRowData={setNewRowData}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          openModal={openModal}
        />
      </PaginationProvider> */}

      <GridComponent
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        newRowData={newRowData}
        setNewRowData={setNewRowData}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
}

export default App;
