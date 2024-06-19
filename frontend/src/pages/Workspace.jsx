import React, { useEffect, useState } from "react";
import "../assets/css/workspace.css";
import { useLocation, useNavigate } from "react-router-dom";
import TreeViewComponent from "../components/TreeViewComponent";
import EditorComponent from "../components/EditorComponent";


function Workspace() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const workspaceId = searchParams.get('id');
  const token = localStorage.getItem('authToken');

  const [value, setValue] = useState([]);
  const [valueTree, setValueTree] = useState([]);

  const handleChildData = (data) => {
    if (data.file.id) {
      setValue(data);
    }
  };

  const handleChildDataB = (data) => {
    setValue(data);
  };

  const handleTreeData = (data) => {
    setValueTree(data);
  };

  useEffect(() => {
    if (!token) {
      console.log("token отсутствует");
      navigate('/login');
      return 0;
    }
  })
  return (
    <div className="ide d-flex justify-content-between">
      <div className="ide_left">
        <TreeViewComponent onSendData={handleChildData} onSendTreeData={handleTreeData}/>
      </div>
      <EditorComponent receivedData={value} onSendData={handleChildDataB} treeData={valueTree} workspaceId={workspaceId} token={token}/>
    </div>

    // <h1>sda</h1>
  );
}

export default Workspace;