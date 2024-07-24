const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');
const delivery=document.querySelector('.delivery');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadmagic);

function loadmagic(){
  loadContent();

}

function loadContent(){
  //Remove magic Items  From Cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  //Product Item Change Event
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

  //Product Cart
    let cartBtns=document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', purchaseClicked)
  document.getElementsByClassName('btn')[0].addEventListener('click', finalOrderClicked)
  updateTotal();
}

function finalOrderClicked(){
  var date = new Date();        
  date.setDate(date.getDate()+5); 
  
  alert('Payment successful...Congratulations... Your magic journey begins now!!!Thank you for your purchase. Your order will be delivered in 3 to 5 working days. Your estimated delivery time is '+date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear());
  delivery.classList.remove('delivery-active');
}

function purchaseClicked(){
 itemList=[];
 var cartItems = document.getElementsByClassName('cart-content')[0];
  while(cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.firstChild)
  }
   updateTotal();
  
   delivery.classList.add('delivery-active');
  const cartCount=document.querySelector('.cart-count');
  let count=0;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }
  cart.classList.remove('cart-active');

}


//Remove Item
function removeItem(){
  if(confirm('Are Your Sure to Remove')){
    let title=this.parentElement.querySelector('.cart-magic-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}

let itemList=[];

//Add Cart
function addCart(){
 let magic=this.parentElement;
 //alert(magic.innerHTML);
 let title=magic.querySelector('.magic-title').innerHTML;
 let price=magic.querySelector('.magic-price').innerHTML;
 let imgSrc=magic.querySelector('.magic-img').src;

 let newProduct={title,price,imgSrc}
 //Check Product already Exist in Cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product Already added in Cart");
  return;
 }else{
 
  itemList.push(newProduct);
 }


let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);

let newProductElement1= createDeliveryProduct(title,price,imgSrc);
let element1=document.createElement('div');
element1.innerHTML=newProductElement1;
let deliveryBasket=document.querySelector('.delivery-content');
deliveryBasket.append(element1);


loadContent();
}


function createCartProduct(title,price,imgSrc){

  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-magic-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <ion-icon name="trash" class="cart-remove"></ion-icon>
</div>
  `;
}


function createDeliveryProduct(title,price,imgSrc){

  return `
  <div>
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-magic-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
</div>
  `;
}

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;
 // alert('number of items in cart');
  //alert(cartItems.length);

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
   // alert(total);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

  });

  totalValue.innerHTML='Rs.'+total;


  // Add Product Count in Cart Icon
  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }


}
