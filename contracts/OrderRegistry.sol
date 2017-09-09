pragma solidity ^0.4.2;

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

  function createOrder(string orderno, string product, string temp, string value, string quantity, string delivery) {
    registry[orderno].product_name = product;
    registry[orderno].thresh_temp = temp;
    registry[orderno].dist_value = value;
    registry[orderno].dist_quantity = quantity;
    registry[orderno].dist_date = delivery;
    OrderGenerated(orderno);
  }

  function setDistValues(string orderno, string name, string delivery, string value, string quantity) {
    registry[orderno].dist_name = name;
    registry[orderno].mfg_date = delivery;
    registry[orderno].mfg_value = value;
    registry[orderno].mfg_quantity = quantity;
    MfgTrigger(orderno);
  }

  function setMfgValues(string orderno, string name, string material, string delivery, string value, string quantity) {
    registry[orderno].mfg_name = name;
    registry[orderno].supplier_date = delivery;
    registry[orderno].supplier_value = value;
    registry[orderno].supplier_quantity = quantity;
    registry[orderno].raw_material_name = material;
    SupplyTrigger(orderno);
  }

  function setReport(string orderno, uint category, string report) {
    if(category == 1) {
      registry[orderno].dist_report = report;
    }
    if( category == 2 ) {
      registry[orderno].mfg_report = report;
    }
    if( category == 3 ) {
      registry[orderno].supplier_report = report;
    }
    ReportSubmit(orderno, category, report);
  }

  function getReport(string orderno, uint category) constant returns(string) {
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

  function fetchInitialDetails(string orderno) constant returns(string, string, string, string, string) {
    return (registry[orderno].product_name,
            registry[orderno].thresh_temp,
            registry[orderno].dist_value,
            registry[orderno].dist_quantity,
            registry[orderno].dist_date);
  }

  function getDistValues(string orderno) constant returns(string, string, string, string) {
    return (registry[orderno].dist_name, registry[orderno].mfg_date,
            registry[orderno].mfg_value, registry[orderno].mfg_quantity);
  }

  function getMfgDetails(string orderno) constant returns(string, string, string, string, string) {
    return (registry[orderno].mfg_name,
    registry[orderno].supplier_date,
    registry[orderno].supplier_value,
    registry[orderno].supplier_quantity,
    registry[orderno].raw_material_name);
  }

}
