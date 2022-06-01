const menuItems = [
    {name: "Angus Burger", price: 8.99, category: 'burger'},
    {name: "Tuna Steak Burger", price: 15.00, category: 'burger'},
    {name: "Bacon Burger", price: 11.50, category: 'burger'},
    {name: "Southwest Chicken Burger", price: 9.99, category: 'burger'},
    {name: "Mozzarella Burger", price: 12.50, category: 'burger'},
    {name: "Cesar Salad", price: 6.50, category: 'salad'},
    {name: "BBQ Chicken Salad", price: 13.99, category: 'salad'},
    {name: "Garden Salad", price: 9.99, category: 'salad'},
    {name: "Veggie Lasagna", price: 17.99, category: 'pasta'},
    {name: "Spaghetti & Meatballs", price: 17.99, category: 'pasta'},
    {name: "Fettuccine Alfredo", price: 17.99, category: 'pasta'},
  ];
  
  intent('show me the menu', p => {
      p.play({command: 'getMenu', data: menuItems})
      p.play("Here's the menu")
  })
  
  intent('order by $(ORDER_BY name|price|category)', p => {
      p.play(`Ordering by ${p.ORDER_BY.value}`)
      const orderByField = p.ORDER_BY.value;
      let orderMenuItems = menuItems
      // eslint-disable-next-line default-case
      switch(orderByField){
          case 'name':
              orderMenuItems = menuItems.sort((p1, p2) => p1.name.localeCompare(p2.name))
              break;
          case 'category':
              orderMenuItems = menuItems.sort((p1, p2) => p1.category.localeCompare(p2.category))
              break;
          case 'price':
              orderMenuItems = menuItems.sort((p1, p2) => p1.price - p2.price)
              break;
              
      }
      
      p.play({command: 'getMenu', data: orderMenuItems})
      p.play(`Ordering by ${p.ORDER_BY.value}`)
  })
  
  const itemsList = menuItems.map(m => m.name).join('|');
  
  intent(`How much is (a|an) $(ITEM ${itemsList})`,
         `How much is (a|an) $(UNAVAILABLE_ITEM* .*)`, p => {
      if(p.UNAVAILABLE_ITEM){
          p.play("Sorry, that item is unavailable");
      } else {
          const itemName = p.ITEM.value;
          const item = menuItems.find(mi => mi.name.toLowerCase() === itemName.toLowerCase());
          p.play(`The ${item.name} is $${item.price}`);
      }
  })
  
  // menuItems.map(item => (item.name).join("|"))
  intent(`Add $(ITEM ${itemsList}) to the cart`,
         `Add $(UNAVAILABLE_ITEM* .*) to the cart`, p => {
      if(p.UNAVAILABLE_ITEM){
          p.play("Sorry, that item is unavailable");
      } else {
          const itemName = p.ITEM.value;
          const item = menuItems.find(mi => mi.name.toLowerCase() === itemName.toLowerCase());
          p.play({command: 'addToCart', data: item});
          p.play(`Adding ${item.name} to the cart`);
  
      }
  })