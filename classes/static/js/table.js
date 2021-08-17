var urgent_tags=[];
var blocking_tags=[];
var old_ticket_list ="";
var old_blocking_list="";
var old_today_list="";
var clients_added=[];
var date_added=[];
var ticket_table;
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

$( "#table-types-select" )
  .change(function() {
    table_selected_types = [];
    $( "#table-types-select option:selected" ).each(function() {
      table_selected_types.push($( this ).text() );
    });
    generate_tab(table_selected_types, tab_selected_clients);
  })
  .trigger("change");


new Litepicker({
	element: document.getElementById('datePock'),
  singleMode: false,

})

new Litepicker({
	element: document.getElementById('datePick'),
  singleMode: false,
  setup: (picker) => {
  	picker.on('selected', (start, end) => {
  	        tab_selected_clients = [];
  	var today = new Date(start.format('DD MMM YYYY'));
  	today.setDate(today.getDate()+1);
   var wah= today.toISOString().substring(0, 10);


     var tomorrow = new Date(end.format('DD MMM YYYY'));
       	tomorrow.setDate(tomorrow.getDate()+1);
        var la= tomorrow.toISOString().substring(0, 10);
          tab_selected_clients.push(la);tab_selected_clients.push(wah);
   generate_tab(table_selected_types, tab_selected_clients);
  	alert(tab_selected_clients[1])
    })
  }
})


//new Lightpick({ field: document.getElementById('datepicker') });

/*
$( "#table-client-select" )
  .change(function() {
    tab_selected_clients = [];
    $( "#table-client-select option:selected" ).each(function() {
      tab_selected_clients.push($( this ).text() );


    });

    generate_tab(tab_selected_types, tab_selected_clients);

  })
  .trigger("change");
*/


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
            if (ticket.includes(daff.daff) && (daff.daff)!=0){
             bloquants+=daff.daff;
             bloquants1+=1}

            if (tocket.includes(daff.daff) && (daff.daff)!=0) {
                             urgents+=daff.daff;
                             urgents1+=1
                             }
                             if (minattente.includes(daff.daff)) {
                                                          autres+=daff.daff;
                                                          }
 if (tocketmoingti.includes(daff.daff)) {
                             autres1+=daff.daff;
                             }
           }})
//var line = {Client: element.status, GTI: Math.trunc(bloquants/60)+"h"+Math.trunc((bloquants/60-Math.trunc(bloquants/60))*60)+"min", GTR:(urgents-autres1), moyGti: Math.trunc(bloquants/bloquants1), moyGtr: urgents/urgents1};
// moyGtr=urgents/urgents1
if(urgents==0){
       if(bloquants1!=0 && urgents1!=0){
               var line = {Client: element.status, GTI: bloquants, GTR:(urgents-autres1-autres), moyGti: Math.trunc(bloquants/bloquants1), moyGtr: Math.trunc((urgents-autres1-autres)/urgents1)};
               }else if(bloquants1!=0 && urgents1==0)
               {var line = {Client: element.status, GTI: bloquants, GTR:(urgents-autres1-autres), moyGti: Math.trunc(bloquants/bloquants1), moyGtr: (urgents-autres1-autres)};}
               else if(bloquants1==0 && urgents1!=0) {var line = {Client: element.status, GTI: bloquants, GTR:(urgents-autres1-autres), moyGti: Math.trunc(bloquants/1), moyGtr: Math.trunc((urgents-autres1-autres)/urgents1)};}
              else {
              var line = {Client: element.status, GTI: bloquants, GTR:(urgents-autres1-autres), moyGti: bloquants/1, moyGtr: (urgents-autres1-autres)};
              }}else{
              if(bloquants1!=0 && urgents1!=0){
                             var line = {Client: element.status, GTI: bloquants, GTR:(urgents-autres1-autres), moyGti: Math.trunc(bloquants/bloquants1), moyGtr: Math.trunc((urgents-autres1-autres)/urgents1)};
                             }else if(bloquants1!=0 && urgents1==0)
                             {var line = {Client: element.status, GTI: bloquants, GTR:(urgents-autres1-autres), moyGti: Math.trunc(bloquants/bloquants1), moyGtr: (urgents-autres1-autres)};}
                             else if(bloquants1==0 && urgents1!=0) {var line = {Client: element.status, GTI: bloquants, GTR:(urgents-autres1-autres), moyGti: Math.trunc(bloquants/1), moyGtr: Math.trunc((urgents-autres1-autres)/urgents1)};}
                            else {
                            var line = {Client: element.status, GTI: bloquants, GTR:(urgents-autres1-autres), moyGti: bloquants/1, moyGtr: (urgents-autres1-autres)};
                            }}
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
           var GTInobb=0;
           var GTRnobb=0;
           var moyGtiah=0;
           var moyGtrah=0;
           var vcv = 0;
           var cvo = 0;
                for (var i=0; i<ticket.length; i++) {
                urgents1+=ticket[i];
               urgents3=ticket.length
                }
                for (var i=0; i<tocket.length; i++) {
                                GTRno+=tocket[i];
                                GTRno3=ticket.length
                                }
                                 let a = cno;
                                 let word = " 1";
                                    // search for pattern in a
                                    let count = 0;
                                    for (let i = 0; i < a.length; i++)
                                    {
                                    // if match found increase count
                                    if (word==(a[i]))
                                       count+=parseInt(a[i]);
                                    }

          for (var i=0; i<generated_data.length; i++) {

                                         GTInobb+=generated_data[i].GTI;

                                         GTRnobb+=generated_data[i].GTR;
                                         moyGtiah+=generated_data[i].moyGti;
                                         moyGtrah+=generated_data[i].moyGtr;
                                         }


    var line1 = {Client: "-", GTI: "Moy globale gti", GTR:"Moy globale gti", moyGti: "Somme moy gti", moyGtr: "Somme moy gtr"}
    generated_data.push(line1);
    for (var i=0; i<generated_data.length; i++) {
    if(generated_data[i].GTI!=0){vcv+=1}
    if(generated_data[i].GTR!=0){cvo+=1}}

        var line2 = {Client: "Total", GTI: Math.trunc(GTInobb/(vcv-1)), GTR:Math.trunc(GTRnobb/(cvo-1)), moyGti: moyGtiah, moyGtr: moyGtrah}
    generated_data.push(line2);
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
        minattente=get_url("/tickets/attendia");
        project=get_url("/tickets/project");
        created=get_url("/tickets/create");
        wait=get_url("/tickets/wait");
        cno=get_url("/tickets/cno");
    var collected_data = collect_data1(selected_types, selected_clients);
    var generated_data = generate_data(collected_data);

    if(ticket_table==null){
        ticket_table = new Tabulator("#table-display", {
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
        ticket_table.setSort([{ column:"Urgent", dir:"desc"},{ column:"Bloquant", dir:"desc"} ])}
    else{
        ticket_table.replaceData(generated_data);
        ticket_table.setSort([{ column:"Urgent", dir:"desc"},{ column:"Bloquant", dir:"desc"} ])
    }
}


