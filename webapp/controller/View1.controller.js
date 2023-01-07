sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                //     var oModel = this.getOwnerComponent().getModel();
                //     var t = this;
                //     oModel.read("/Sales_by_Categories", {
                //         success: function (Data) {
                //             var model1 = new JSONModel();
                //             model1.setData(Data);
                //             // alert("Success");
                //             t.getView().setModel(model1, "model1");
                //             MessageBox.success("Success");
                //         },
                //         error: function (oerror) {
                //             // alert(oerror);
                //             MessageBox.error("Error");
                //         }
                //     });
                // },

                //To read Filtered/sorted and skipped Value
                var oModel = this.getOwnerComponent().getModel();
                var oFilter = new sap.ui.model.Filter('ProductName', 'EQ', 'Chai');
                var oFilter1 = new sap.ui.model.Filter('ProductName', 'EQ', 'Chang');
                // var oFilter2 = new sap.ui.model.Filter('ProductSales', 'EQ', '4887');
                var oFilter3 = new sap.ui.model.Filter('ProductName', 'EQ', 'Ipoh Coffee');
                // false(ascending order), true(descending order)
                var oSorter = new sap.ui.model.Sorter('ProductName', false);
                var t = this;
                oModel.read("/Sales_by_Categories", {
                    filters: [oFilter, oFilter1, oFilter3],
                    sorters: [oSorter],

                    //For skipping some rows skip(skip from top), top(Total rows after skipped)
                    urlParameters: { $skip: 1, $top: 2 },
                    success: function (Data) {
                        var model1 = new JSONModel();
                        model1.setData(Data);
                        MessageBox.success("Success");
                        t.getView().byId("Tab1").setModel(model1, "model1");
                    },
                    error: function (oerror) {
                        MessageBox.error(oerror);
                    }
                });
            },
            onLoadDialog: function (oEvent) {
                var myView = this.getView();
                var oDialog = myView.byId("idDialog");
                if (!oDialog) {
                    oDialog = sap.ui.xmlfragment(myView.getId(), "project1.fragments.fragment1", this);
                    myView.addDependent(oDialog);
                    oDialog.open();
                } else {
                    this.byId("idDialog").open();
                }
                debugger;
                var key = oEvent.oSource.mAggregations.cells[3].mProperties;
                var oModel = this.getOwnerComponent().getModel();
                var t = this;
                oModel.read("/Sales_by_Categories", {
                    success: function (odata) {
                        var model11 = new JSONModel();
                        model11.setData(odata);
                        t.getView().setModel(model11);
                        //  this.getView().setModel(model11);

                        debugger;
                        var key1 = key.text;
                        var key2 = model11.oData.results;
                        var array1 = [];

                        for (var i = 0; i < key2.length; i++) {
                            if (key1 == key2[i].ProductSales) {
                                array1.push(key2[i]);

                                var oModel3 = new JSONModel();
                                oModel3.setData(array1);
                                t.getView().setModel(oModel3, "oModel3");
                            }
                        }
                    }
                });
            },
            cancelpress: function () {
                this.byId("idDialog").close();
            },
            okpress: function () {
                this.byId("idDialog").close();
            }

        });
    });


