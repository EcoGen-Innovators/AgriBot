// Load the data from localStorage when the page is loaded or refreshed
window.addEventListener('load', () => {
  const savedChartData = localStorage.getItem('chartData');
  if (savedChartData) {
    chartData = JSON.parse(savedChartData);
    myChart.data = chartData;
    myChart.update();
  }
});

// ! Water Usage
let chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Water Usage (in gallons)',
      data: [0, 0, 0, 0, 0, 0, 0], // Initial data
      backgroundColor: '#02cd98',
      borderWidth: 1,
      barPercentage: 0.1,
    },
  ],
};

const ctx = document.getElementById('water-usage-chart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: chartData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

function addDataToChart() {
  // Get user input
  const newData = parseFloat(document.getElementById('new-data').value) || 0;

  // Add the new data to the chart
  chartData.datasets[0].data.push(newData);

  // Remove the oldest data point if there are more than 7 data points
  if (chartData.datasets[0].data.length > 7) {
    chartData.datasets[0].data.shift();
  }

  // Save the updated data to localStorage
  localStorage.setItem('chartData', JSON.stringify(chartData));

  // Update the chart
  myChart.update();
}


// ! Initialize inventory data
   // Initialize the inventory from localStorage if available
   let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

   // Function to update the inventory table
   function updateInventoryTable() {
     const tableBody = document.querySelector("#inventoryTable tbody");
     tableBody.innerHTML = "";
 
     const filterType = document.querySelector("#filterType").value.toLowerCase();
     const searchInput = document.querySelector("#searchInput").value.toLowerCase();
 
     inventory.forEach((item, index) => {
       if (filterType === 'all' || item.type.toLowerCase() === filterType) {
         if (searchInput === '' || item.name.toLowerCase().includes(searchInput)) {
           const row = document.createElement("tr");
           row.innerHTML = `
             <td>${item.type}</td>
             <td>${item.name}</td>
             <td>${item.quantity}</td>
             <td class="text-center">
             <div class="dropdown">
                <button class="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots"></i>
                </button>
                <ul class="dropdown-menu">
                    <li><button type="button" class="dropdown-item edit-btn" data-index="${index}">Edit</button></li>
                    <li><button type="button" class="dropdown-item delete-btn" data-index="${index}">Delete</button></li>
                </ul>
                </div>
               
             </td>
           `;
           tableBody.appendChild(row);
         }
       }
     });
 
     // Save the updated inventory to localStorage
     localStorage.setItem('inventory', JSON.stringify(inventory));
 
     // Add event listeners to edit and delete buttons
     const editButtons = document.querySelectorAll(".edit-btn");
     const deleteButtons = document.querySelectorAll(".delete-btn");
 
     editButtons.forEach((button) => {
       button.addEventListener("click", () => {
         const index = button.getAttribute("data-index");
         openEditModal(index);
       });
     });
 
     deleteButtons.forEach((button) => {
       button.addEventListener("click", () => {
         const index = button.getAttribute("data-index");
         deleteItem(index);
       });
     });
   }
 
   // Edit an item
  function openEditModal(index) {
    const item = inventory[index];
    document.querySelector("#editItemType").value = item.type;
    document.querySelector("#editItemName").value = item.name;
    document.querySelector("#editQuantity").value = item.quantity;
    document.querySelector("#editItemIndex").value = index;
    const editItemModal = new bootstrap.Modal(document.getElementById('editItemModal'));
    editItemModal.show();
  }
 
   // Event listener for the "Save Changes" button in the Edit Item Modal
   const saveEditItemButton = document.querySelector("#saveEditItem");
   saveEditItemButton.addEventListener("click", () => {
     const index = document.querySelector("#editItemIndex").value;
     const itemType = document.querySelector("#editItemType").value;
     const itemName = document.querySelector("#editItemName").value;
     const quantity = parseInt(document.querySelector("#editQuantity").value);
 
     if (itemType && itemName && !isNaN(quantity) && quantity > 0) {
       inventory[index] = { type: itemType, name: itemName, quantity: quantity };
       updateInventoryTable();
       const editItemModal = new bootstrap.Modal(document.getElementById('editItemModal'));
       editItemModal.hide();
     }
   });
 
   // Delete an item
   function deleteItem(index) {
     inventory.splice(index, 1);
     updateInventoryTable();
   }
 
   // Event listener for the "Add Item" button
   const addItemButton = document.querySelector("#addItem");
   addItemButton.addEventListener("click", () => {
     const itemType = document.querySelector("#itemType").value;
     const itemName = document.querySelector("#itemName").value;
     const quantity = parseInt(document.querySelector("#quantity").value);
 
     if (itemType && itemName && !isNaN(quantity) && quantity > 0) {
       inventory.push({ type: itemType, name: itemName, quantity: quantity });
       updateInventoryTable();
       document.querySelector("#inventoryForm").reset();
     }
   });
 
   // Event listener for filter and search input changes
   const filterTypeInput = document.querySelector("#filterType");
   const searchInput = document.querySelector("#searchInput");
 
   filterTypeInput.addEventListener("change", updateInventoryTable);
   searchInput.addEventListener("input", updateInventoryTable);
 
   // Initial call to populate the inventory table
   updateInventoryTable();


  // ! Task Asign
     // Initialize worker data from local storage
     let workers = JSON.parse(localStorage.getItem('workers')) || [];

     // Function to add a new worker
     function addWorker() {
         const workerName = document.getElementById('workerName').value;
         if (workerName.trim() === '') {
             alert('Worker name cannot be empty');
             return;
         }

         workers.push({ name: workerName, tasks: [] });
         localStorage.setItem('workers', JSON.stringify(workers));
         refreshWorkerTable();
         document.getElementById('workerName').value = '';
     }

     // Function to edit a worker
     let editedWorkerIndex = null;

     function editWorker(index) {
         editedWorkerIndex = index;
         const worker = workers[index];
         document.getElementById('editedWorkerName').value = worker.name;
     }

     function saveEditedWorker() {
         const newName = document.getElementById('editedWorkerName').value;
         workers[editedWorkerIndex].name = newName;
         localStorage.setItem('workers', JSON.stringify(workers));
         refreshWorkerTable();
     }

     // Function to assign tasks to a worker
     let assignedWorkerIndex = null;

     function assignTasks(index) {
         assignedWorkerIndex = index;
     }

     function assignTask() {
         const task = document.getElementById('taskInput').value;
         if (task.trim() !== '') {
             workers[assignedWorkerIndex].tasks.push(task);
             localStorage.setItem('workers', JSON.stringify(workers));
             refreshWorkerTable();
             document.getElementById('taskInput').value = '';
         }
     }

     // Function to delete a worker
     function deleteWorker(index) {
         workers.splice(index, 1);
         localStorage.setItem('workers', JSON.stringify(workers));
         refreshWorkerTable();
     }

     // Function to refresh the worker table
     function refreshWorkerTable() {
         const workerTable = document.getElementById('workerTable');
         workerTable.innerHTML = '';

         workers.forEach((worker, index) => {
             const row = workerTable.insertRow();
             const tasksSpan = document.createElement('span');
             tasksSpan.innerHTML = worker.tasks.join(', ');

             row.innerHTML = `
                 <td>${worker.name}</td>
                 <td></td>
                 <td class="hstack gap-3 text-center justify-content-center">
                     <button class="btn bg-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#editWorkerModal" onclick="editWorker(${index})"><i class="bi bi-pencil-square"></i></button>
                     <button class="btn bg-secondary btn-sm" onclick="deleteWorker(${index})"><i class="bi bi-trash"></i></button>
                     <button class="btn bg-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#assignTasksModal" onclick="assignTasks(${index})"><i class="bi bi-clipboard-plus"></i></button>
                 </td>
             `;

             row.cells[1].appendChild(tasksSpan);
         });
     }

     // Initial table population
     refreshWorkerTable();

const offcanvasElementList = document.querySelectorAll('.offcanvas')
const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl))