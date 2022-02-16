/*
    AutoGuide_v2
    Developed by Cube

    cubezeero@gmail.com
*/


function buildUI(thisObj){
    var wnd ;

    if(thisObj instanceof Panel){
        wnd = thisObj ;
    }else{
            wnd = new Window("palette", "AutoGuide v2", [0, 0, 125, 95],{resizeable:false});
    }

    var i;
    var filepath = new File(new File($.fileName).parent);
	  var iconpath = filepath.fullName + "/AutoGuide_icons";

    var dn = wnd.add("edittext", [5, 5, 120, 25], "");
    dn.helpTip = "Split number";

    var st_drpdwn = wnd.add("dropdownlist", [5, 30, 120, 50],  ["Vertical", "Horizontal", "ALL"]);
    st_drpdwn.helpTip = "Select guide type";
    st_drpdwn.selection = 0;

    var CreateCenterBtn = wnd.add("iconbutton", [5,60,40,95], iconpath + "/ccg.png", {style:"toolbutton"});
    CreateCenterBtn.helpTip = "Create Center Guide";

    var CreateBtn = wnd.add("iconbutton", [45,60,80,95], iconpath + "/cg.png", {style:"toolbutton"});
    CreateBtn.helpTip = "Create Guide";

    var RemoveBtn = wnd.add("iconbutton", [85,60,120,95], iconpath + "/rg.png", {style:"toolbutton"});
    RemoveBtn.helpTip = "Remove Guide";


  RemoveBtn.onClick = function(){

    var activeItem = app.project.activeItem;
    var guidenum = activeItem.guides.length;

    if(activeItem){
      for (i = 0 ; i <= Number(guidenum) ; i++){
        activeItem.removeGuide(0);
      }
    }else{
      alert("The active item is not selected.");
    }
  }

  CreateCenterBtn.onClick = function(){

     var activeItem = app.project.activeItem;

     if(activeItem){
          activeItem.addGuide(0, activeItem.height/2);
          activeItem.addGuide(1, activeItem.width/2);
     }else{
         alert("The active item is not selected.");
     }
  }

  CreateBtn.onClick = function(){

    var activeItem = app.project.activeItem;

    if(activeItem){

      if(st_drpdwn.selection.text=="Vertical"){
          var DNheight = activeItem.height/Number(dn.text)

          for (i = 1; i <= Number(dn.text)-1; i++){
              activeItem.addGuide(0, DNheight*i);
          }
      }

      if(st_drpdwn.selection.text=="Horizontal"){

          var DNwidth = activeItem.width/Number(dn.text);

          for (i = 1; i <= Number(dn.text)-1; i++){
              activeItem.addGuide(1, DNwidth*i);
          }
        }

      if(st_drpdwn.selection.text=="ALL"){
          var DNheight = activeItem.height/Number(dn.text);

          for (i = 1; i <= Number(dn.text)-1; i++){
              activeItem.addGuide(0, DNheight*i);
          }

          var DNwidth = activeItem.width/Number(dn.text);

          for (i = 1; i <= Number(dn.text)-1; i++){
              activeItem.addGuide(1, DNwidth*i);
          }
        }

      }else{
        alert("The active item is not selected.");
      }

    }

  return wnd ;
}

var toolspanel = buildUI (this) ;
if(!(toolspanel instanceof Panel)){
    toolspanel.center();
    toolspanel.show();
 }
