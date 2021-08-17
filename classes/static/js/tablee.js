var urgent_tags=[];
var blocking_tags=[];
var old_ticket_list ="";
var old_blocking_list="";
var old_today_list="";
var clients_added=[];
var date_added=[];
var ticket_tablee;
var tab_selected_date = [];
var tab_selected_clients = [];
var tab_selected_types = [];
var bar_selected_types = [];

var get_list_added_types = [];

var OFFLINE=false;


function set_connection(state){
	if (state){
		$("#server-state").addClass("on");
		$("#toggle").prop( "checked", true );
	}
	else{
		$("#server-state").removeClass("on");
		$("#toggle").prop( "checked", false );
	}
}

// Recupere les element d'un URL

function get_url(str){
    if (OFFLINE){
        return [""];
    }
    try {
		const req = new XMLHttpRequest();
		req.open('GET', str, false);
		req.send(null);
		var response;
		var ticket_list=[];
		if (req.status === 200) {
	    		set_connection(true);
			response = JSON.parse(req.responseText);
		}
		else{
		    console.error("Unable to get urgent tag list")
		}
	}
	catch(error) {
		console.error("Unable to get urgent tag list"+error.toString())
	}
	return response;
}

 // Affichage des Selectors

function get_list(select_name, grouped_by){
    var select = $(select_name);
    var type_list = Enumerable.From(old_ticket_list).GroupBy(grouped_by,null,function(key1,g) { return key1; }).ToArray();
    type_list.forEach(function(element){
        if (!get_list_added_types.includes(select_name + "_" + element)) {
            select.append(new Option(element, element))
            get_list_added_types.push(select_name + "_" + element);
        }
    })
    select.html(select.find('option').sort(function(x, y) {
        return $(x).text() > $(y).text() ? -1 : 1;
      }));
    select.selectpicker('refresh');
    return type_list;
}




// Afficher uniquement les elements selectionner en Selector

$( "#tablee-types-select" )
  .change(function() {
    table_selected_types = [];
    $( "#tablee-types-select option:selected" ).each(function() {
      table_selected_types.push($( this ).text() );
    });
    generate_tab(table_selected_types, tab_selected_clients);
  })
  .trigger("change");


$(function() {
    $("#datepicker").datepicker();

    $("#datepicker").val();
    tab_selected_clients = [];
    $("#datepicker").on("change",function(){
       var selected = $(this).val();
      tab_selected_clients.push(selected);
    });
        generate_tab(tab_selected_types, tab_selected_clients);
});

$( "#tablee-client-select" )
  .change(function() {
    tab_selected_clients = [];
//if(tab_selected_clients.length<3){}
    $( "#tablee-client-select option:selected" ).each(function() {
      tab_selected_clients.push($( this ).text() );
    });

    generate_tab(tab_selected_types, tab_selected_clients);
  })
  .trigger("change");



function makeDelay(ms) {
    var timer = 0;
    return function(callback){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
};
// C'est pour les Selectors
$("#ticket-encours-filter")
 .keyup(function() {
    makeDelay(1500)(display_new_list(old_ticket_list, "accordion-new", "normal"));
 })

var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
}



function collect_data1(selected_types, selected_clients){
        var filtered_tickets=old_ticket_list;
        if (selected_types.length!=0){
            filtered_tickets=Enumerable.From(filtered_tickets)
            .Where(function(item){
             return selected_types.includes(item.priority) || (!item.priority && selected_types.includes("Unassigned")) // elements in Selector
            }).ToArray();
        }
        if (selected_clients.length!=0){

var startDate =selected_clients[1];
var endDate = selected_clients[0];
var dateMove = new Date(startDate);
var strDate = startDate;

while (strDate < endDate){
  var strDate = dateMove.toISOString().slice(0,10);
  tab_selected_clients.push(strDate);
  dateMove.setDate(dateMove.getDate()+1);
};
            filtered_tickets=Enumerable.From(filtered_tickets)
            .Where(function(item){
                return selected_clients.includes(item.createdOn2) || (!item.createdOn2 && selected_types.includes("Unassigned"))
            }).ToArray();}
        var aggregatedObject = Enumerable.From(filtered_tickets)
        .GroupBy("$.projet", null,
                 function ( status, grouped_tickets) {
                     return {
                        status: status,
                       wah: Enumerable.From(grouped_tickets).GroupBy("$.daff",null,function(daff,tickets){
                        return{
                        daff: daff,
                            count: tickets.Count()}
                       }).ToArray()
                     }})
        .ToArray();
        // count: tickets.Count()}  tickets
        return aggregatedObject;}



function generate_data(raw_tab){
    var generated_data=[];
    raw_tab.forEach(function(element){
        var bloquants=0;
        var urgents=0;
        var autres=0;
        var bloquants1=0;
                var urgents1=0;
                var autres1=0;
var autres2=0;
    element.wah.forEach(function(daff){

if (daff.daff!=null){
            if (ticket.includes(daff.daff)){
             bloquants+=daff.daff;
             bloquants1+=daff.count}
            /* else if (tacket.includes(daff.daff)){
                     bloquants+=daff.daff;
                     }*/
                  /*  else if (taercket.includes(daff.daff)){
                             bloquants+=daff.daff;
                             }
                              else if (bloquant.includes(daff.daff)){
                                       bloquants+=daff.daff;
                                       }*/
            if (tocket.includes(daff.daff)) {
                             urgents+=daff.daff;
                             urgents1+=daff.count
                             }
                             if (minattente.includes(daff.daff)) {
                                                          autres+=daff.daff;
                                                          }
 /*if (tocketmoingti.includes(daff.daff)) {
                             autres1+=daff.daff;
                             }*/
           }})
//var line = {Client: element.status, GTI: Math.trunc(bloquants/60)+"h"+Math.trunc((bloquants/60-Math.trunc(bloquants/60))*60)+"min", GTR:(urgents-autres1), moyGti: Math.trunc(bloquants/bloquants1), moyGtr: urgents/urgents1};
// moyGtr=urgents/urgents1
if(bloquants1!=0 && urgents1!=0){
        var line = {Client: element.status, GTI: bloquants+"min", GTR:(urgents-autres1), moyGti: Math.trunc(bloquants/bloquants1), moyGtr: urgents/urgents1};
        }else if(bloquants1!=0 && urgents1==0)
        {var line = {Client: element.status, GTI: bloquants+"min", GTR:(urgents-autres1), moyGti: Math.trunc(bloquants/bloquants1), moyGtr: urgents};}
        else if(bloquants1==0 && urgents1!=0) {var line = {Client: element.status, GTI: bloquants+"min", GTR:(urgents-autres1), moyGti: Math.trunc(bloquants/1), moyGtr: Math.trunc(urgents/urgents1)};}
       else {
       var line = {Client: element.status, GTI: bloquants+"min", GTR:(urgents-autres1), moyGti: bloquants/1, moyGtr: urgents};
       }
//generated_data.push(line1);
// generated_data=[line1];
        if (generated_data==null) {
            generated_data=[line];}
        else { generated_data.push(line);}
                })
          var urgents1=0;
           var GTRno=0;
          var GTRno3=0;
           var urgents3=0;
                for (var i=0; i<ticket.length; i++) {
                urgents1+=ticket[i];
               urgents3=ticket.length
                }
                for (var i=0; i<tocket.length; i++) {
                                GTRno+=tocket[i];
                                GTRno3=ticket.length
                                }
    var line1 = {Client: "Total", GTI: urgents1+"min", GTR:GTRno, moyGti:Math.trunc(urgents1/urgents3), moyGtr: Math.trunc(GTRno/GTRno3)}
    generated_data.push(line1);
    return generated_data;}

function generate_tab(selected_types, selected_clients){
    urgent_tags=get_url("/Config/Tag/Urgent");
    blocking_tags=get_url("/Config/Tag/Blocking");
        ticket=get_url("/tickets/toggle");
       tocket=get_url("/tickets/togg");
       tocketmoingti=get_url("/tickets/cloot");
        tacket=get_url("/tickets/majeur");
        taercket=get_url("/tickets/critique");
        bloquant=get_url("/tickets/bloquant");
        minattente=get_url("/tickets/attente");
        created=get_url("/tickets/create");
    var collected_data = collect_data1(selected_types, selected_clients);
    var generated_data = generate_data(collected_data);

    if(ticket_tablee==null){
        ticket_tablee = new Tabulator("#table-display", {
            headerFiltessrPlaceholder:"filter data...",
            layout:"fitColumns",
            data:generated_data,
            rowFormatter:function(row){
                    if(row.getData().Bloquant > 0){
                        row.getElement().classList.add("bg-danger");
                    }
                    if(row.getData().Urgent > 3){
                           row.getElement().classList.add("table-danger");
                    }},
            autoColumns:true,});
        ticket_tablee.setSort([{ column:"Urgent", dir:"desc"},{ column:"Bloquant", dir:"desc"} ])}
    else{
        ticket_tablee.replaceData(generated_data);
        ticket_tablee.setSort([{ column:"Urgent", dir:"desc"},{ column:"Bloquant", dir:"desc"} ])
    }
}