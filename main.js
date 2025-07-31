 ;
 let title = document.getElementById("title");
 let price = document.getElementById("price");
 let taxes = document.getElementById("taxes");
 let ads = document.getElementById("ads");
 let discount = document.getElementById("discount");
 let total = document.getElementById("total");
 let count = document.getElementById("count");
 let category = document.getElementById("category");
 let submit = document.getElementById("submit");



 let mood = 'create'
 let tmp;

 function getTotal() {

     if (price.value != "") {
         let result = +price.value + +taxes.value + +ads.value - +discount.value;
         total.innerHTML = result;
         total.style.background = "green";
     } else {
         total.innerHTML = "";
         total.style.background = "red";

     }
 }




 let dataPro;


 if (localStorage.product != null) { dataPro = JSON.parse(localStorage.product) } else {
     dataPro = [];
 }
 submit.onclick = function() {
     let newPro = {
         title: title.value,
         price: price.value,
         taxes: taxes.value,
         ads: ads.value,
         discount: discount.value,
         total: total.innerHTML,
         count: +count.value,
         category: category.value,
     };

     if (mood === 'create') {
         if (newPro.count > 1) {
             for (let i = 0; i < newPro.count; i++) {
                 dataPro.push({...newPro, count: 1 });
             }
         } else {
             dataPro.push(newPro);
         }
     } else {
         dataPro[tmp] = newPro;
         mood = 'create';
         submit.innerHTML = 'Create';
         count.style.display = 'block';
     }

     localStorage.setItem("product", JSON.stringify(dataPro));
     clearData();
     readData();
 }

 function clearData() {
     title.value = '';

     price.value = '';
     taxes.value = ''
     ads.value = '';
     discount.value = '';
     total.innerHTML = '';
     count.value = '';

     category.value = '';
 }

 function readData() {
     let table = '';
     for (let i = 0; i < dataPro.length; i++) {
         table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                 <td>${dataPro[i].category}</td>
                <td>${dataPro[i].discount}</td>
          
               <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                <td><button onclick="updateData(${i})" class="update">Update</button></td>
            </tr>
        `;



     }
     document.getElementById('tbody').innerHTML = table

     let btnDelete = document.getElementById("deleteAll");

     if (dataPro.length > 0) {
         btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All(${dataPro.length}) </button>`;
     } else {
         btnDelete.innerHTML = "";
     }
 }




 readData()

 function deleteData(i) {

     dataPro.splice(i, 1)

     localStorage.product = JSON.stringify(dataPro)
     readData()
 }


 function deleteAll() {
     localStorage.clear();
     dataPro = [];
     readData();
 }


 function updateData(i) {

     title.value = dataPro[i].title
     price.value = dataPro[i].price
     taxes.value = dataPro[i].taxes
     ads.value = dataPro[i].ads
     discount.value = dataPro[i].discount

     count.style.display = 'none'
     category.value = dataPro[i].category


     submit.innerHTML = "update"


     mood = 'update'

     tmp = i;
     getTotal()
     scroll({
         top: 0,
         behavior: "smooth"
     })
 }

 let search = document.getElementById('search')

 let searchmood = 'title';

 function getSearchMood(id) {

     if (id == "searchTitle")

     {
         searchmood = 'title';

         search.placeholder = "search by title"
     } else {
         searchmood = 'category';
         search.
         placeholder = "search by category";
     }

     search.value = '';
     search.focus()
     document.getElementById('tbody').innerHTML = '';

 }

 function searchData(value) {
     let table = '';
     value = value.toLowerCase();

     if (searchmood == 'title') {
         for (let i = 0; i < dataPro.length; i++) {
             if (dataPro[i].title.toLowerCase().includes(value)) {
                 table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].category}</td>
                        <td>${dataPro[i].discount}</td>
                        <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                        <td><button onclick="updateData(${i})" class="update">Update</button></td>
                    </tr>
                `;
             }
         }
     } else if (searchmood == 'category') {
         for (let i = 0; i < dataPro.length; i++) {
             if (dataPro[i].category.toLowerCase().includes(value)) {
                 table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].category}</td>
                        <td>${dataPro[i].discount}</td>
                        <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                        <td><button onclick="updateData(${i})" class="update">Update</button></td>
                    </tr>
                `;
             }
         }
     }

     document.getElementById('tbody').innerHTML = table;

 }