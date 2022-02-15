/*
    AutoGuide_v2
    Developed by Cube
*/


function buildUI(thisObj){
    var wnd ;

    if(thisObj instanceof Panel){
        wnd = thisObj ;
    }else{
            wnd = new Window("palette", "AutoGuide v2", [0, 0, 125, 95],{resizeable:false});
    }

    var i;
    var guide = 0;
    var filepath = new File(new File($.fileName).parent);
	  var iconpath = filepath.fullName + "/AutoGuide_icons";

    var dn = wnd.add("edittext", [5, 5, 120, 25], "");
    dn.helpTip = "split number";

    var st_drpdwn = wnd.add("dropdownlist", [5, 30, 120, 50],  ["Vertical", "Horizontal", "ALL"]);
    st_drpdwn.helpTip = "Select guide type";
    st_drpdwn.selection = 0;

    var CreateCenterBtn = wnd.add("iconbutton", [5,60,40,95], iconpath + "/ccg.png", {style:"toolbutton"});
    CreateCenterBtn.helpTip = "Create Center Guide";

    var CreateBtn = wnd.add("iconbutton", [45,60,80,95], iconpath + "/cg.png", {style:"toolbutton"});
    CreateBtn.helpTip = "Create Guide";

    var RemoveBtn = wnd.add("iconbutton", [85,60,120,95], iconpath + "/rg.png", {style:"toolbutton"});
    RemoveBtn.helpTip = "Remove Guide";


  //ガイド削除
  RemoveBtn.onClick = function(){

    var activeComp = app.project.activeItem;

    if(activeComp && (activeComp instanceof CompItem)){
      for (i = 0 ; i<= guide ; i++){
        activeComp.removeGuide(0);
      }
        guide = 0
    }else{
      alert("The active composition is not selected.");
    }
  }


  //中心のガイドを作成
  CreateCenterBtn.onClick = function(){

     var activeComp = app.project.activeItem;

     if(activeComp&&(activeComp instanceof CompItem)){
          activeComp.addGuide(0, activeComp.height/2);
          activeComp.addGuide(1, activeComp.width/2);
          guide = guide+2
     }else{
         alert("The active composition is not selected.");
     }
  }


  //指定された分割数に応じたガイド作成
  CreateBtn.onClick = function(){

    var activeComp = app.project.activeItem;

    if(activeComp&&(activeComp instanceof CompItem)){

      //縦
      if(st_drpdwn.selection.text=="Vertical"){
          var DNheight = activeComp.height/Number(dn.text)

          for (i = 1; i <= Number(dn.text)-1; i++){
              activeComp.addGuide(0, DNheight*i);
          }

          guide = guide+(Number(dn.text)-1);
      }

      //横
      if(st_drpdwn.selection.text=="Horizontal"){

          var DNwidth = activeComp.width/Number(dn.text);

          for (i = 1; i <= Number(dn.text)-1; i++){
              activeComp.addGuide(1, DNwidth*i);
          }

          guide = guide+(Number(dn.text)-1);
        }


      //縦横両方
      if(st_drpdwn.selection.text=="ALL"){
          var DNheight = activeComp.height/Number(dn.text);

          for (i = 1; i <= Number(dn.text)-1; i++){
              activeComp.addGuide(0, DNheight*i);
          }

          var DNwidth = activeComp.width/Number(dn.text);

          for (i = 1; i <= Number(dn.text)-1; i++){
              activeComp.addGuide(1, DNwidth*i);
          }

          guide = guide+((Number(dn.text)*2)-2);
        }

      }else{
        alert("The active composition is not selected.");
      }

    }

  return wnd ;
}

var toolspanel = buildUI (this) ;
if(!(toolspanel instanceof Panel)){
    toolspanel.center();
    toolspanel.show();
 }
