var bar_chart;
var autres_list =[];
var urgents_list = [];
var bloquants_list = [];
var clients_list = ["hey"];

 var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


var bar_ctx = document.getElementById('client-bar-chart-draw');


function get_project_data(selected_types){

    var filtered_ticket_list = old_ticket_lista;

    if (selected_types.length != 0){
        filtered_ticket_list=Enumerable.From(filtered_ticket_list)
        .Where(function(item){
         return selected_types.includes(item.type) || (!item.type && selected_types.includes("Unassigned"))
        }).ToArray();
    }

    $("#bar-ticket-number")[0].innerHTML = filtered_ticket_list.length;

    var aggregatedObject = Enumerable.From(filtered_ticket_list)
                .GroupBy("$.projet", null,
                         function (status, grouped_tickets) {
                             return {
                               project: status,
                               priorities: Enumerable.From(grouped_tickets).GroupBy("$.priority",null,function(priority,tickets){
                                return{
                                    priority: priority,
                                    count: tickets.Count()
                                }
                               }).ToArray()
          }
     }).ToArray();

     return aggregatedObject;
}
function generate_project_data(raw_tab){
    raw_tab.forEach(function(element){
        var bloquants=0;
        var urgents=0;
        var autres=0;
        element.priorities.forEach(function(priority){
            if (blocking_tags.includes(priority.priority)){
                bloquants+=priority.count;
            }
            else if (urgent_tags.includes(priority.priority)) {
                urgents+=priority.count;
            }
            else{
                autres+=priority.count;
            }
        })
        clients_list.push(element.project);
        autres_list.push(autres);
        urgents_list.push(urgents);
        bloquants_list.push(bloquants)
    })
}



function generate_bar_chart(selected_types){
    autres_list =[];
    urgents_list = [];
    bloquants_list = [];
    clients_list = [];
    createdon_list = [];
    bar_chart = new Chart(bar_ctx, {
        type: 'bar',
        autoResize:false,
        resizableRows:true,
        data: {
            labels: clients_list,

            datasets: [
            {
                label: 'Autres',
                data: autres_list,
    						backgroundColor: "#33b5e5",
    						hoverBackgroundColor: "#0099CC",
    						hoverBorderWidth: 0
            },
            {
                label: 'Urgents',
                data: urgents_list,
    						backgroundColor: "#ffbb33",
    						hoverBackgroundColor: "#ff8800",
    						hoverBorderWidth: 0
            },
            {
                label: 'Bloquants',
                data: bloquants_list,
    						backgroundColor: "#ff4444",
    						hoverBackgroundColor: "#cc0000",
    						hoverBorderWidth: 0
            },
            ]
        },
        options: {
         		animation: {
            	duration: 10,
            },
            tooltips: {
    					mode: 'label',
              callbacks: {
              label: function(tooltipItem, data) {
              	return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
              }
              }
             },
            scales: {
              xAxes: [{
              	stacked: true,
                gridLines: { display: false },
                }],
              yAxes: [{
              	stacked: true,
                ticks: {
            			callback: function(value) { return numberWithCommas(value); },
         				},
                }],
            },
            legend: {

            display: true,
            reverse: true,
            }
        },
        plugins: [{
        beforeInit: function (chart) {
          chart.data.labels.forEach(function (value, index, array) {
            var a = [];
            a.push(value.slice(0, 5));
            var i = 1;
            while(value.length > (i * 5)){
            	a.push(value.slice(i * 5, (i + 1) * 5));
                i++;
            }
            array[index] = a;
          })
        }
      }]
       }
    );
    var project_data =get_project_data(selected_types);
    generate_project_data(project_data);
    bar_chart.update();
}


$("#bar-types-select")
  .change(function() {
    bar_selected_types = [];
    $("#bar-types-select option:selected").each(function() {
      bar_selected_types.push($(this).text() );
    });
    generate_bar_chart(bar_selected_types);
  })
  .trigger("change");





