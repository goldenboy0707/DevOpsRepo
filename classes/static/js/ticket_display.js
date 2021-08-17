var ticket_title = "__TICKET_NAME__ - __TICKET_SUBJECT__"
var serveur_redmine=["Pictime","Nocibe"]
var ticket_title_redmine = "__TICKET_PROJECT__ - __TICKET_NAME__ - __TICKET_SUBJECT__"
var left_display_views=["tickets_display","tickets_table","client-bar-chart"];
var left_view_displayed=2;


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

function switch_view_left(){
    var next_display_view=(left_view_displayed+1)%left_display_views.length;
    $("#"+left_display_views[left_view_displayed]).addClass("d-none");
    $("#"+left_display_views[next_display_view]).removeClass("d-none");
    left_view_displayed=(left_view_displayed+1)%left_display_views.length;
    if (typeof ticket_table !== 'undefined'){
        ticket_table.redraw();
    }

}

function display_ticket_list(tickets_list, accordion_div, prefix){
    document.getElementById(accordion_div).innerHTML="";
}

function display_new_list(tickets_list, accordion_div){
    display_ticket_list(tickets_list,accordion_div,"new");
        $("#today-card").removeClass("d-none");
        $("#today-card").addClass("d-none");
        $("#ticket-nam")[0].innerHTML = tickets_list.length;

}function display_new_list(tickets_list, accordion_div){
     display_ticket_list(tickets_list,accordion_div,"new");
         $("#today-card").removeClass("d-none");
         $("#today-card").addClass("d-none");
         $("#ticket-nam")[0].innerHTML = tickets_list.length;

 }


function display_today_list(tickets_list, accordion_div, prefix){
if (prefix == "today") {
             //  $("#ticket-num")[0].innerHTML = tickets_list.length;
           }
       document.getElementById(accordion_div).innerHTML="";
           var filter = $("#ticket-encours-filter")[0].value;
           if (filter) {
               filter = filter.toLowerCase();
               tickets_list = tickets_list.filter(ticket => {return (ticket.ticketName && ticket.ticketName.toLowerCase().includes(filter)) || (ticket.subject && ticket.subject.toLowerCase().includes(filter)) || (ticket.projet && ticket.projet.toLowerCase().includes(filter)) || (ticket.updatedOn && ticket.updatedOn.toLowerCase().includes(filter))});
           }
           for (var i=0; i<tickets_list.length; i++) {
               var ticket = tickets_list[i];
               var $template = $('div[id^="template-card"]');
               var $empty_ticket = $template.clone().prop('id', 'ticket-'+prefix+"-"+i );
               $empty_ticket.removeClass("d-none");
               if (i==0) $empty_ticket.find(".collapse").first().addClass("show");
               var ticket_string=$empty_ticket.html();
               if (serveur_redmine.includes(ticket.source)){
                  ticket_string=ticket_string.replace(/__TICKET_TITLE__/g,ticket_title_redmine);
               }
               else {
                   ticket_string=ticket_string.replace(/__TICKET_TITLE__/g,ticket_title);
               }
               ticket_string=ticket_string.replace(/__TICKET_ID__/g,prefix+"-"+i);
               ticket_string=ticket_string.replace(/__TICKET_PROJECT__/g,ticket.projet);
               ticket_string=ticket_string.replace(/__TICKET_ASSIGNED_TO__/g,ticket.assignedTo);
               ticket_string=ticket_string.replace(/__TICKET_LINK__/g,ticket.ticketLink);
               ticket_string=ticket_string.replace(/__TICKET_NAME__/g,ticket.ticketName);
               ticket_string=ticket_string.replace(/__TICKET_TYPE__/g,ticket.type);
               if(ticket.createdOn3!=null && ticket.time==null){
               ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Qualifié");
               }else if(ticket.time!=null && ticket.createdOn3==null) {
               ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Clôturé");
               }else{ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Attente de retour");}
               ticket_string=ticket_string.replace(/__TICKET_PRIORITY__/g,ticket.priority);
               ticket_string=ticket_string.replace(/__TICKET_SUBJECT__/g,ticket.subject);

               ticket_string=ticket_string.replace(/__ACCORDION_NAME__/g,"#"+accordion_div);

var start = new Date(ticket.createdOn),
    finish = new Date(ticket.updatedOn),
    dayMilliseconds = 1000 * 60 * 60 * 24;
var weekendDays = 0;
while (start <= finish) {
//  combien reste de jours jusqu'au Weekend
    var day = start.getDay()
    if (day == 0 || day == 6) {
        weekendDays++;
    }
    start = new Date(+start + dayMilliseconds);
}

function getIncidentDuration(startDatee, endDatee) {
//Paramètres de la plage horaire
var daff = {}
    var nbHeure = 0;
    var nbmino=0
  while(startDatee.getTime() <= endDatee.getTime()) {
        if(startDatee.getHours() >= 8 && startDatee.getHours() <= 12) {
            nbHeure=nbHeure+1;}
        if(startDatee.getHours() >= 14 && startDatee.getHours() <= 17) {
                        nbHeure=nbHeure+1;}
        if(startDatee.getHours()==14 && startDatee.getMinutes()<30){nbmino=nbmino+1;}
        startDatee.setMinutes(startDatee.getMinutes() + 1);
        daff.nbHeure = nbHeure
        daff.nbmino = nbmino}
    return daff;}

     // si le statut est en attente apres avoir etre cloturé (Qualifié)
     if(ticket.count>0 && ticket.createdOn3==null && ticket.time==null){
  daff = getIncidentDuration(new Date(ticket.createdOn), new Date(ticket.updatedOn));
  ticket_string=ticket_string.replace(/__WEEK_END__/g,daff.nbHeure.toString());}
  //var kok = " Traité dans "+(daff.nbHeure)+" heures matinal, "



               if(ticket.createdOn3!=null){
               var kok = " Traité dans "+Math.trunc(tiket.daff/60)+" heures, "+Math.trunc((((ticket.daff)/60)-Math.trunc((ticket.daff)/60))*60)+" minutes, "
              ticket_string=ticket_string.replace(/__TICKET_NUMBER__/g,kok);}else{ticket_string=ticket_string.replace(/__TICKET_NUMBER__/g,"pas encore");}


             if(ticket.time!=null){
             var kok = " Traité dans "+Math.trunc(ticket.diff/60)+" heures, "+Math.trunc((((ticket.diff)/60)-Math.trunc((ticket.diff)/60))*60)+" minutes, "
              ticket_string=ticket_string.replace(/__TICKET_RESO__/g,kok);}else{
              ticket_string=ticket_string.replace(/__TICKET_RESO__/g,"pas encore");}

               var createdOn=Date.parse(ticket.createdOn)
               var createdOn_String = new Date( createdOn ).toLocaleString();
               ticket_string=ticket_string.replace(/__TICKET_CREATED_ON__/g,createdOn_String);

         if(ticket.createdOn3!=null && ticket.time==null){
        // if(ticket.createdOn3.getHours()==0){ticket.createdOn3.setHours(12)}
               var updatedOn=Date.parse(new Date())
               var updatedOn_String = new Date( updatedOn ).toLocaleString();
               if (ticket.updatedBy!=null) updatedOn_String+=" par " +ticket.updatedBy
               ticket_string=ticket_string.replace(/__TICKET_MODIFIED_ON__/g,updatedOn_String);}
               else if(ticket.time!=null){
               var updatedOn=Date.parse(ticket.time)
               var updatedOn_String = new Date( updatedOn ).toLocaleString();
               if (ticket.updatedBy!=null) updatedOn_String+=" par " +ticket.updatedBy
               ticket_string=ticket_string.replace(/__TICKET_MODIFIED_ON__/g,updatedOn_String);}
              else {var updatedOn=Date.parse(ticket.updatedOn)
                                   var updatedOn_String = new Date( updatedOn ).toLocaleString();
                                   if (ticket.updatedBy!=null) updatedOn_String+=" par " +ticket.updatedBy
                                   ticket_string=ticket_string.replace(/__TICKET_MODIFIED_ON__/g,updatedOn_String);}

               document.getElementById(accordion_div).innerHTML=document.getElementById(accordion_div).innerHTML+ticket_string;
           }
/*
if(ticket.createdOn3!=null && ticket.time==null){
               ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Qualifié");
               }else if(ticket.time!=null && ticket.createdOn3==null) {
               ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Clôturé");
               }else{ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Attente de retour");}*/

/*        if(ticket.createdOn3!=null && ticket.time==null){
          var status_string="qualifié";}else if(ticket.time!=null && ticket.createdOn3==null) {var status_string="attente de retour";}else{var status_string="attente de retour";}*/
  for (var i=0; i< tickets_list.length; i++) {
        var ticket = tickets_list[i];
        if(ticket.createdOn3!=null && ticket.time==null){
        var status_string="qualifié";
        status_string=status_string.replace(/ /g,"-");
        $("#ticket-"+prefix+"-"+i+"-status").addClass("ticket-badge-"+status_string)}else if(ticket.time!=null && ticket.createdOn3==null) {
         var status_string="clôturé";
                status_string=status_string.replace(/ /g,"-");
                $("#ticket-"+prefix+"-"+i+"-status").addClass("ticket-badge-"+status_string)}else{
               var status_string="attente de retour";
                               status_string=status_string.replace(/ /g,"-");
                               $("#ticket-"+prefix+"-"+i+"-status").addClass("ticket-badge-"+status_string) }
    }
       // $("#ticket-num")[0].innerHTML = tickets_list.length;

}



function display_tickets_list(tickets_list, accordion_div, prefix){
    document.getElementById(accordion_div).innerHTML="";
    var filter = $("#ticket-encours-filter")[0].value;
    if (filter) {
        filter = filter.toLowerCase();
        tickets_list = tickets_list.filter(ticket => {return (ticket.ticketName && ticket.ticketName.toLowerCase().includes(filter)) || (ticket.subject && ticket.subject.toLowerCase().includes(filter)) || (ticket.projet && ticket.projet.toLowerCase().includes(filter))});
    }
    var j=0;
    for (var i=0; i<tickets_list.length; i++) {
        var ticket = tickets_list[i];
        var $template = $('div[id^="template-card"]');
        var $empty_ticket = $template.clone().prop('id', 'ticket-'+prefix+"-"+i );
        $empty_ticket.removeClass("d-none");
        if (i==0) $empty_ticket.find(".collapse").first().addClass("show");
        var ticket_string=$empty_ticket.html();
        if (serveur_redmine.includes(ticket.source)){
           ticket_string=ticket_string.replace(/__TICKET_TITLE__/g,ticket_title_redmine);
        }
        else {
            ticket_string=ticket_string.replace(/__TICKET_TITLE__/g,ticket_title);
        }
        ticket_string=ticket_string.replace(/__TICKET_ID__/g,prefix+"-"+i);
        ticket_string=ticket_string.replace(/__TICKET_PROJECT__/g,ticket.projet);
        ticket_string=ticket_string.replace(/__TICKET_ASSIGNED_TO__/g,ticket.assignedTo);
        ticket_string=ticket_string.replace(/__TICKET_LINK__/g,ticket.ticketLink);
        ticket_string=ticket_string.replace(/__TICKET_NAME__/g,ticket.ticketName);
        ticket_string=ticket_string.replace(/__TICKET_TYPE__/g,ticket.type);
if(ticket.createdOn3!=null && ticket.time==null){
               ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Qualifié");
               }else if(ticket.time!=null) {
               ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Clôturé");

               }else{ticket_string=ticket_string.replace(/__TICKET_STATUS__/g,"Attente de retour");}
        ticket_string=ticket_string.replace(/__TICKET_PRIORITY__/g,ticket.priority);
        ticket_string=ticket_string.replace(/__TICKET_SUBJECT__/g,ticket.subject);

var d = new Date("2021-12-28").getMonth();
        ticket_string=ticket_string.replace(/__WEEK_END__/g,ticket.watcher);
        ticket_string=ticket_string.replace(/__ACCORDION_NAME__/g,"#"+accordion_div);





var start = new Date(ticket.createdOn),
    finish = new Date(ticket.updatedOn),
    dayMilliseconds = 1000 * 60 * 60 * 24;

var weekendDays = 0;
while (start <= finish) {
//  combien reste de jours jusqu'au Weekend
    var day = start.getDay()
    if (day == 0 || day == 6) {
        weekendDays++;
    }
    start = new Date(+start + dayMilliseconds);
}
var w = weekendDays.toString();

var is_weekend =  function(date1){
    var dt = new Date(date1);

    if(dt.getDay() == 6 || dt.getDay() == 0)
       {
        return  1;
        }else { return 0}
}
var daaa = '2021-06-05'
var vv=is_weekend(daaa)
var wa = vv.toString();

// jours Feriee
var mydate = new Date('2021-04-12')
var mydate1 = new Date('2021-05-20');
var mydate2 = new Date('2021-04-27');
var mydate3 = new Date('2021-05-17');
var mydate4 = new Date('2021-04-13');
var mydate5 = new Date('2021-04-14');
var moo = new Date(ticket.createdOn).getTime()
var startDate = mydate.getTime()
var startDate1 = mydate1.getTime()
var startDate2 = mydate2.getTime()
var startDate3 = mydate3.getTime()
var startDate4 = mydate4.getTime()
var startDate5 = mydate5.getTime()
var my = new Date(ticket.updatedOn).getTime()
var z = 0;
var p = 0;
var r = 0;
var g = 0;
 //var holidays = ['2021-04-17', '2021-04-18', '2021-04-27', '2021-05-17'];
    //var mydate = new Date(holidays[i]);
   // var startDate = mydate.getTime()
       if (startDate <= my && startDate >= moo)
       {z++}
      if (startDate1 <= my && startDate1 >= moo)
              {z++}
      if (startDate3 <= my && startDate3 >= moo)
              { z++;             }
      if (startDate2 <= my && startDate2 >= moo)
                 {           z++;   }
                  if (startDate4 <= my && startDate4 >= moo)
                                  {           z++;   }
                                   if (startDate5 <= my && startDate5 >= moo)
                                                   {           z++;   }

    if(z==1 || z==2){r=1}
    if(z==3 || z==4){r=2}
    if(z==5 || z==6){r=3}

var s = z;



date1 = new Date(ticket.createdOn);
date2 = new Date(ticket.updatedOn);
//dote1 = new Date(ticket.createdOn);
//dote2 = new Date(ticket.updatedOn);

 diffEnmin = ((date2-date1)/1000)/60;  //49
 restmin = diffEnmin % 60
heurr = (diffEnmin-restmin)/60



   var HEURE_FIN1 = 17;
   var HEURE_DEBUT = 14;
   var MINUT_DEBUT = 30;
   var apr=0
   var ioo=0
   var fafa = new Date(ticket.createdOn)
   var tata = new Date(ticket.updatedOn)

 if(fafa.getHours()>=HEURE_DEBUT && HEURE_FIN1>=fafa.getHours()){
 apr=MINUT_DEBUT*(tata.getDay()-fafa.getDay())
 }



function dateDiff(date1, date2){
    var diff = {}                           // Initialisation
    var tmp = date2 - date1;

    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Get nombre de secondes

    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Get nombre de minutes

    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = (tmp % 24);                   // Get nombre d'heures

    tmp = Math.floor((tmp-diff.hour)/7);   // Get jours restants

    diff.day = tmp-weekendDays-z

    return diff;
}

date1 = new Date(ticket.createdOn);
date2 = new Date(ticket.updatedOn);
diff = dateDiff(date1, date2);


       // var n = diff.toString();
 if(ticket.createdOn3!=null && ticket.doff!=null){
               var kok = " Traité dans "+Math.trunc(ticket.doff/60)+" heures, "+Math.trunc((((ticket.doff)/60)-Math.trunc((ticket.doff)/60))*60)+" minutes, "
              ticket_string=ticket_string.replace(/__TICKET_NUMBER__/g,kok);}else{ticket_string=ticket_string.replace(/__TICKET_NUMBER__/g,"pas encore");}

             if(ticket.time!=null && ticket.diff!=null){
             var kok = " Traité dans "+Math.trunc((ticket.diff-ticket.watcher-ticket.doff)/60)+" heures, "+Math.trunc((((ticket.diff-ticket.watcher-ticket.doff)/60)-Math.trunc((ticket.diff-ticket.watcher-ticket.doff)/60))*60)+" minutes, "
              ticket_string=ticket_string.replace(/__TICKET_RESO__/g,kok);}else{
              ticket_string=ticket_string.replace(/__TICKET_RESO__/g,"pas encore");}
   var znv = new Date(ticket.createdOn);
   if(znv.getHours()==0){znv.setHours(12)
                          var createdOn=Date.parse(znv)}else{var createdOn=Date.parse(ticket.createdOn)}
        var createdOn_String = new Date( createdOn ).toLocaleString();
        ticket_string=ticket_string.replace(/__TICKET_CREATED_ON__/g,createdOn_String);


           if(ticket.createdOn3!=null && ticket.time==null){
   var sos = new Date(ticket.createdOn3);
           if(sos.getHours()==0){sos.setHours(12)
                       var updatedOn=Date.parse(sos)}
                       else{var updatedOn=Date.parse(ticket.createdOn3)}
                       var updatedOn_String = new Date( updatedOn ).toLocaleString();
                       if (ticket.updatedBy!=null) updatedOn_String+=" par " +ticket.updatedBy
                       ticket_string=ticket_string.replace(/__TICKET_MODIFIED_ON__/g,updatedOn_String);}
                      if(ticket.time!=null){
                       var sas = new Date(ticket.time2);
                       if(sas.getHours()==0){sas.setHours(12)
                       var updatedOn=Date.parse(sas)}
                       else{var updatedOn=Date.parse(ticket.time2)}
                       var updatedOn_String = new Date( updatedOn ).toLocaleString();
                       if (ticket.updatedBy!=null) updatedOn_String+=" par " +ticket.updatedBy
                       ticket_string=ticket_string.replace(/__TICKET_MODIFIED_ON__/g,updatedOn_String);}
                      else {
                       var sis = new Date(ticket.updatedOn);
                                 if(sis.getHours()==0){sis.setHours(12)
                                             var updatedOn=Date.parse(sis)}else{var updatedOn=Date.parse(ticket.updatedOn)}
                                           var updatedOn_String = new Date( updatedOn ).toLocaleString();
                                           if (ticket.updatedBy!=null) updatedOn_String+=" par " +ticket.updatedBy
                                           ticket_string=ticket_string.replace(/__TICKET_MODIFIED_ON__/g,updatedOn_String);}
                                   document.getElementById(accordion_div).innerHTML=document.getElementById(accordion_div).innerHTML+ticket_string;
    }
     for (var i=0; i< tickets_list.length; i++) {
           var ticket = tickets_list[i];
           if(ticket.createdOn3!=null && ticket.time==null){
           var status_string="qualifié";
           status_string=status_string.replace(/ /g,"-");
           $("#ticket-"+prefix+"-"+i+"-status").addClass("ticket-badge-"+status_string)}else if(ticket.time!=null && ticket.createdOn3==null) {
            var status_string="clôturé";
                   status_string=status_string.replace(/ /g,"-");
                   $("#ticket-"+prefix+"-"+i+"-status").addClass("ticket-badge-"+status_string)}else{
                  var status_string="attente de retour";
                                  status_string=status_string.replace(/ /g,"-");
                                  $("#ticket-"+prefix+"-"+i+"-status").addClass("ticket-badge-"+status_string) }
       }
    if (prefix == "normal") {
     //   $("#list-ticket-num")[0].innerHTML = tickets_list.length;
        $("#ticket-num")[0].innerHTML = tickets_list.length;
    }
}



function display_blocking_list(tickets_list, accordion_div){
    display_tickets_list(tickets_list,accordion_div,"blocking");
    if (tickets_list.length!=0){

        $("#blocking-card").removeClass("d-none");
        $("#right-fullscreen").removeClass("d-none");
    }
    else{
        reset_timer();

        $("#blocking-card").addClass("d-none");
        $("#right-fullscreen").addClass("d-none");
    }
    document.getElementById("blocking-number").innerHTML = tickets_list.length
}



function get_ticket_list(url){
    if (OFFLINE){

            }
 	try {
		const req = new XMLHttpRequest();
		req.open('GET', url, false);
		req.send(null);
		var ticket_list=[];
		if (req.status === 200) {
	    		set_connection(true);
			ticket_list = JSON.parse(req.responseText);
		} else {
	    		set_connection(false);
			return;
		}
	}
	catch(error) {
		set_connection(false);
	}
	return ticket_list;
}




function update_tickets(){
var ticket_list =get_ticket_list("/tickets/o");
	var is_updated=false;
	if (ticket_list==null) return;

		display_tickets_list(ticket_list,"accordion-tickets","normal");
		is_updated=true;


	var ticket_list =get_ticket_list("/tickets/ooo");
    	var is_updated=false;
    	if (ticket_list==null) return;
    	if (!(JSON.stringify(old_ticket_list)===JSON.stringify(ticket_list))){
    		old_ticket_list=ticket_list;
    	//	display_tickets_list(ticket_list,"accordion-tickets","normal");
    		is_updated=true;
    	}

    		var ticket_list =get_ticket_list("/tickets/alloa");
            	var is_updated=false;
            	if (ticket_list==null) return;
            	if (!(JSON.stringify(old_ticket_list)===JSON.stringify(ticket_list))){
            		old_ticket_lista=ticket_list;
            	//	display_tickets_list(ticket_list,"accordion-tickets","normal");
            		is_updated=true;
            	}


	var today_list =get_ticket_list("/tickets/o");
    	if (today_list==null) return;
        //display_today_list(today_list,"accordion-today", "today");
    	is_updated=true;

var new_list =get_ticket_list("/Tickets/Today");
    	if (today_list==null) return;
        display_new_list(new_list,"accordion-new");
    	is_updated=true;

	var blocking_list =get_ticket_list("tickets/bloki");  //  Tickets/Bloquants
	if (blocking_list==null) return;
	if (!(JSON.stringify(old_blocking_list)===JSON.stringify(blocking_list))){
		old_blocking_list=blocking_list;
		display_blocking_list(blocking_list,"accordion-blocking");
		is_updated=true;
	}
	if (is_updated){
	    generate_tab(tab_selected_types, tab_selected_clients);
	    generate_bar_chart(bar_selected_types);
   	    get_list('#bar-types-select',"$.type");
   	 // get_list('#table-types-select',"$.type");
	    get_list('#table-types-select',"$.priority");
        get_list('#table-client-select',"$.createdOn2");


	}
}

update_tickets();
$(".switch-left").click(function(){
switch_view_left()
})
window.setInterval(update_tickets,100000);
start=get_date("/Tickets/Bloquants/lastDate");


/*
function getIncidentDuration(startDatee, endDatee) {
//Paramètres de la plage horaire
var daff = {}
    var nbHeure = 0;
    var nbmino=0
  while(startDatee.getTime() <= endDatee.getTime()) {
        if(startDatee.getHours() >= 8 && startDatee.getHours() <= 12) {
            nbHeure=nbHeure+1;}
        if(startDatee.getHours() >= 14 && startDatee.getHours() <= 17) {
                        nbHeure=nbHeure+1;
                        }
                        if(startDatee.getHours()==14 && startDatee.getMinutes()<30){nbmino=nbmino+1;}
        startDatee.setMinutes(startDatee.getMinutes() + 1);
        daff.nbHeure = nbHeure
        daff.nbmino = nbmino

        }
    return daff;}*/
//daff = getIncidentDuration(date1, date2);

 //   Math.abs()Math.trunc
//var kok = " Traité dans "+Math.trunc((daff.nbHeure)/60)+" heures matinal, "+Math.trunc((((daff.nbHeure)/60)-Math.trunc((daff.nbHeure)/60))*60)+" minutes matinal, "+(daff.nbmino)+" min jusqu'a 14.30/09.30.. "+s+" jours fériée "+w+" weekends "



/*
function get_date(url){
    var date = Date.getDate();
    if (OFFLINE){
        return Date.parse("2019-08-22")
                    }
 	try {
		const req = new XMLHttpRequest();
		req.open('GET', url, false);
		req.send(null);
		if (req.status === 200) {
	    		set_connection(true);

			date = Date.parse(req.responseText.replace(/\"/g,""));
		} else {
	    		set_connection(false);
			return;
		}
	}
	catch(error) {
		set_connection(false);
	}
	return date;
}*/