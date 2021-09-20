// Dynamic base-url for production
const url = (process.env.NODE_ENV ? process.env.PRODUCTION_BASEURL : process.env.DEVELOPMENT_BASEURL);

$("#add-user").submit(function(event) {
  alert("Data inserted successfully")
})

$("#update-user").submit(function(event) {
  // Prevent browser refresh after submit
  event.preventDefault()
  
  // Store serialiezed array of form data {name: ..., value: ...}
  let unindexed_array = $("#update-user").serializeArray()
  let data = {}

  // Serialized array to dictionary
  $.map(unindexed_array, function(n,i) {
    data[n["name"]] = n["value"]
  })

  let request = {
    "url": `${url}api/users/${data.id}`,
    "method": "PUT",
    "data": data
  }

  // Make ajax request
  $.ajax(request).done(function(response) {
    alert("Data updated successfully")
  })
})

if(window.location.pathname == "/") {
  $ondelete = $("a.table-delete")
  $ondelete.click(function() {
    let id = $(this).attr("data-id")

    let request = {
      "url": `${url}api/users/${id}`,
      "method": "DELETE",
    }

    if(confirm("Are you sure you want to delete user?")) {
      // Make ajax request
      $.ajax(request).done(function(response) {
        alert("User successfully deleted")

        // Reload browser
        location.reload()
      })
    }
  })
}

// Click-to-sort table headers
$("th").click(function(){
  // Skip "actions" header
  if ($(this).text() == "Actions") {return}

  // Change active header color
  $("th").css("color", "white")
  $(this).css("color", "steelblue")

  var table = $(this).parents("table").eq(0)
  var rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()))
  
  // Toggle ascending
  this.asc = !this.asc
  if (!this.asc){rows = rows.reverse()}

  // Append sorted rows to table
  for (var i = 0; i < rows.length; i++){ 
    table.append(rows[i]) 
  }
})

// Compare function
function comparer(index) {
  return function(a, b) {
      var valA = getCellValue(a, index), valB = getCellValue(b, index)
      return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
  }
}

function getCellValue(row, index){ 
  return $(row).children("td").eq(index).text() 
}