pragma solidity ^0.5.0;


contract OrderRegistry {
  struct Order {
    string supplier_name;
    string mfg_name;
    string dist_name;

    string supplier_report;
    string mfg_report;
    string dist_report;

    string supplier_quantity;
    string mfg_quantity;
    string dist_quantity;

    string supplier_value;
    string mfg_value;
    string dist_value;

    string supplier_date;
    string mfg_date;
    string dist_date;

    string thresh_temp;
    string product_name;
    string raw_material_name;

  }

  mapping(string=>Order) registry;

  event OrderGenerated(string orderno);
  event MfgTrigger(string orderno);
  event SupplyTrigger(string orderno);
  event ReportSubmit(string orderno, uint category, string report);

  function createOrder(string memory orderno, string memory product, string memory temp, string memory value, string memory quantity, string memory delivery) public {
    registry[orderno].product_name = product;
    registry[orderno].thresh_temp = temp;
    registry[orderno].dist_value = value;
    registry[orderno].dist_quantity = quantity;
    registry[orderno].dist_date = delivery;
    emit OrderGenerated(orderno);
  }

  function setDistValues(string memory orderno, string memory name, string memory delivery, string memory value, string memory quantity) public {
    registry[orderno].dist_name = name;
    registry[orderno].mfg_date = delivery;
    registry[orderno].mfg_value = value;
    registry[orderno].mfg_quantity = quantity;
    emit MfgTrigger(orderno);
  }

  function setMfgValues(string memory orderno, string memory name, string memory material, string memory delivery, string memory value, string memory quantity) public {
    registry[orderno].mfg_name = name;
    registry[orderno].supplier_date = delivery;
    registry[orderno].supplier_value = value;
    registry[orderno].supplier_quantity = quantity;
    registry[orderno].raw_material_name = material;
    emit SupplyTrigger(orderno);
  }

  function setReport(string memory orderno,uint category, string memory report) public {
    if(category == 1) {
      registry[orderno].dist_report = report;
    }
    if( category == 2 ) {
      registry[orderno].mfg_report = report;
    }
    if( category == 3 ) {
      registry[orderno].supplier_report = report;
    }
    emit ReportSubmit(orderno, category, report);
  }

  function getReport(string memory orderno,uint category) public view returns(string memory) {
    if(category == 1) {
      return registry[orderno].dist_report;
    }
    if( category == 2 ) {
      return registry[orderno].mfg_report;
    }
    if( category == 3 ) {
      return registry[orderno].supplier_report;
    }
    return "undefined";
  }

  function fetchInitialDetails(string memory orderno) public view returns(string memory, string memory, string memory,string memory, string memory) {
    return (registry[orderno].product_name,
            registry[orderno].thresh_temp,
            registry[orderno].dist_value,
            registry[orderno].dist_quantity,
            registry[orderno].dist_date);
  }

  function getDistValues(string memory orderno) public view returns(string memory, string memory, string memory, string memory) {
    return (registry[orderno].dist_name , registry[orderno].mfg_date,
            registry[orderno].mfg_value, registry[orderno].mfg_quantity);
  }

  function getMfgDetails(string memory orderno) public view returns(string memory,string memory,string memory,string memory,string memory) {
    return (registry[orderno].mfg_name,
    registry[orderno].supplier_date,
    registry[orderno].supplier_value,
    registry[orderno].supplier_quantity,
    registry[orderno].raw_material_name);
  }

}
