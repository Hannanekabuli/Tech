fetch("./products.json")
.then(response => {
   return response.json();
})
.then(data => RenderData(data));

var content =  document.querySelector('.content');
var ShoppingCart = [];

function RenderData(data){
    var cartInfo = document.querySelector('.fa-shopping-cart');
    var listOfData = JSON.parse(localStorage.getItem("product"));
    if(listOfData)
    cartInfo.innerText = " " + JSON.parse(localStorage.getItem("product")).length;

    data.forEach((item, index) => {
        var listItems = document.createElement("div");
        var product = document.createElement("div");
        var itemTitle =  document.createElement('h2');
        var image =  document.createElement('img');
        var description =  document.createElement('p');
        var price =  document.createElement('div');
        var quantity =  document.createElement('div');
        var button =  document.createElement('button');

        listItems.className = "item-list";
        product.className = "product";
        product.id = item.id;
        itemTitle.className = "item-title";
        image.className = "image-div";
        description.className = "description";
        price.className ="price";
        quantity.className = "quantity";
        button.className ="add-button";
        button.type ="button";
        button.textContent = "Add To Cart";
        button.addEventListener("click", ClickHandler);

        itemTitle.innerHTML = item.title;
        image.src = "./assets/" + item.image;
        description.innerHTML = item.description;
        price.innerHTML = item.price;

        product.append(itemTitle);
        product.append(image);
        product.append(description);
        product.append(price);
        product.append(quantity);
        product.appendChild(button);
        listItems.append(product);

        listItems.append(product);
        content.append(listItems);

    });

}

function ClickHandler(e){
    var clickedItemValue =  e.target.parentNode.children;
    var div = e.target.parentNode;
    var data = {
        id: div.id,
        title: clickedItemValue[0].innerText,
        image: clickedItemValue[1].src.split("/").slice(-1).pop(),
        description: clickedItemValue[2].innerText,
        price: clickedItemValue[3].innerText,
        quantity: 1,
    };

    // load old data
    var old = localStorage.getItem("product");
    if(old != "[]" && old != "undefined")
    {
        var json = JSON.parse(old);
        if(json)
        json.forEach(d => ShoppingCart.push(d));
    }

    ShoppingCart.forEach(el =>{
        var result = el.id == data.id;
        if(result)
        {
            data.quantity = data.quantity + el.quantity;
            data.price = data.quantity  * data.price;
            el.id = data.id;
            el.title =data.title;
            el.price = data.price;
            el.description = data.description;
            el.image= data.image;
            el.quantity = data.quantity;
        }
    });

    var result =  ShoppingCart.find((e) => e.id == data.id);
    if(!result)
        ShoppingCart.push(data);

   if(ShoppingCart.length ==0)
    ShoppingCart.push(data);

    var cartInfo = document.querySelector('.fa-shopping-cart');
    cartInfo.innerText = " " + ShoppingCart.length;
    localStorage.setItem("product", JSON.stringify(ShoppingCart));
    ShoppingCart = [];
}
