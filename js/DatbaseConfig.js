
// connectivity
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, get, set, child, update, remove,onValue }
    from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDm8lO9l8d8XUayj-dOgVPtjsAwYRpZ5cM",
    authDomain: "auth-form-5ea4a.firebaseapp.com",
    databaseURL: "https://auth-form-5ea4a-default-rtdb.firebaseio.com",
    projectId: "auth-form-5ea4a",
    storageBucket: "auth-form-5ea4a.appspot.com",
    messagingSenderId: "607068770244",
    appId: "1:607068770244:web:3b18327eddf122ce4e9e91"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



// RealTime Database
const db = getDatabase();



// input feild..
const ProductId = document.getElementById('proId');
const ProductName = document.getElementById('proName');
const ProdctPrice = document.getElementById('proPrice');
const ProductCate = document.getElementById('proCat');
const ProductDes = document.getElementById('proDesc');
// const productTable = document.getElementById('myTable');

// button
const insertBtn = document.getElementById('addBtn');
const getBtn = document.getElementById('Selectbtn');
const updaBtn = document.getElementById('UpdateBtn');
const dltBtn = document.getElementById('DeleteBtn');



// Add Data In RealTime Database
function InsertData() {
    set(ref(db, "Product/" + ProductId.value), {
        proid: ProductId.value,
        NameOfPro: ProductName.value,
        proPri: ProdctPrice.value,
        proCat: ProductCate.value,
        proDes: ProductDes.value
    })
        .then(() => {
            alert('Data Store Successfully');
        })
        .catch((error) => {
            alert("Unsuccessful" + error);
        });
        ProductId.value = "";
        ProductName.value = "";
        ProdctPrice.value = "";
        ProductCate.value = "";
        ProductDes.value = "";

}


insertBtn.addEventListener('click' ,InsertData );




var tbody=document.getElementById("myTable");

function  AddItemToTable( ProductId,ProductName,ProdctPrice,ProductCate ,ProductDes){
    console.log('insert single value at time');
    var trow=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    var td3=document.createElement("td");
    var td4=document.createElement("td");
    var td5=document.createElement("td");
   
    td1.innerHTML = ProductId;
    td2.innerHTML = ProductName;
    td3.innerHTML = ProdctPrice;
    td4.innerHTML = ProductCate;
    td5.innerHTML = ProductDes;


    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    tbody.appendChild(trow);
}



function GetAllDataRealTime(){
    console.log("get all the data")
    const dbRef = ref(db, 'Product/');
   onValue(dbRef,(row)=>{
            row.forEach((rowdata)=>{
                const rowKey=rowdata.key;
                const rowKeyData=rowdata.val();
                console.log(rowKeyData);

                var ProductId = rowdata.val().proid;
                var ProductName = rowdata.val().NameOfPro;
                var ProdctPrice = rowdata.val().proPri;
                var ProductCate = rowdata.val().proCat;
                var ProductDes = rowdata.val().proDes;

                AddItemToTable(ProductId , ProductName,ProdctPrice,ProductCate ,ProductDes);
            })
        })
    
}
window.onload = GetAllDataRealTime()


// selecting data
function selectData() {
    const dbref = ref(db);

    get(child(dbref, "Product/" + ProductId.value)).then((snapshot) => {
        if (snapshot.exists()) {
            ProductName.value = snapshot.val().NameOfPro;
            ProdctPrice.value = snapshot.val().proPri;
            ProductCate.value = snapshot.val().proCat;
            ProductDes.value = snapshot.val().proDes
        }
        else {
            alert("Data Not Found In DataBae");
        }
    })
        .catch((error) => {
            alert("Unsuccessful , error" + error)
        });

}
getBtn.addEventListener('click', selectData);




//   update (Edit) data...
function updatedata() {

    update(ref(db, "Product/" + ProductId.value), {
        NameOfPro: ProductName.value,
        proPri: ProdctPrice.value,
        proCat: ProductCate.value,
        proDes: ProductDes.value
    })
        .then(() => {
            alert("Data Updated Successfully");
        })
        .catch((error) => {
            alert("Unseccessful , error" + error);
        });
    ProductId.value = "";
    ProductName.value = "";
    ProdctPrice.value = "";
    ProductCate.value = "";
    ProductDes.value = "";
}
updaBtn.addEventListener('click', updatedata);



// delete data
function deleteData(){
    remove(ref(db , "Product/" + ProductId.value))
    .then(()=>{
      alert("Data Removed Successfully");
    })
    .catch((error)=>{
      alert("Unseccessful , error" + error);
    });
    ProductId.value = "";
    ProductName.value = "";
    ProdctPrice.value = "";
    ProductCate.value = "";
    ProductDes.value = "";
  }
  dltBtn.addEventListener('click',deleteData) ;


  // log-out
const userLogout = document.getElementById('logOut');
if (userLogout) {
    userLogout.addEventListener('click', (event) => {

        event.preventDefault()
        signOut(auth).then(() => {
            window.location.assign("register.html")
        }).catch((error) => {
            alert(error.message)
        });

    })
}


