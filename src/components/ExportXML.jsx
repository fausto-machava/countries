import exportFromJSON from "export-from-json";

export default function XMLExport(props) {

  function onClick() {
    const data = props.data;   //dataForXml
    const fileName = props.fileName ? `${props.fileName}countries_${new Date().toJSON().slice(0, 10)}_${new Date().toJSON().slice(11, 19)}` : `exportedcountries_${new Date().toJSON().slice(0, 10)}_${new Date().toJSON().slice(11, 19)}`;
    let fields = props.fields ? props.fields : [];  //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
    const exportType = 'xml';
    exportFromJSON({data, fileName, fields, exportType})
  }

  return (
    <button className='px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600' onClick={onClick}>
      Exportar em XML
    </button>
  )

}