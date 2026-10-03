export type MenuProduct = {
  id: string
  name: string
  category: string
  price: number
  image: string
  note: string
}

export const categories = ['Burgers & Sandwiches', 'Appetizers', 'Soups', 'Cocktails', 'Pasta', 'Steaks', 'Seafood', 'Margaritas', 'Soft Drinks', 'Tea & Coffee']

export const menu: MenuProduct[] = [
  { id: 'rockstar-burger', name: 'Rockstar Special Burger', category: 'Burgers & Sandwiches', price: 1200, image: '/assets/burger/Burger_Rockstar%20special%20burger.png', note: 'The house headliner' },
  { id: 'zinger-burger', name: 'Zinger Burger', category: 'Burgers & Sandwiches', price: 750, image: '/assets/burger/burger_zinger%20burger.png', note: 'Crunch with attitude' },
  { id: 'club-sandwich', name: 'Rockstar Club Sandwich', category: 'Burgers & Sandwiches', price: 850, image: '/assets/sandwich/sandwich_rockstar%20club%20sandwich.png', note: 'Stacked & loaded' },
  { id: 'crispy-sandwich', name: 'Crispy Sandwich', category: 'Burgers & Sandwiches', price: 900, image: '/assets/sandwich/sandwich_crispy%20sandwich.png', note: 'A crunchy favourite' },
  { id: 'chicken-corn-soup', name: 'Chicken Corn Soup', category: 'Soups', price: 450, image: '/assets/soup/soup_Chicken%20corn%20soup.png', note: 'A warming classic' },
  { id: 'hot-sour-soup', name: 'Hot & Sour Soup', category: 'Soups', price: 450, image: '/assets/soup/soup_Hot%20and%20Sour%20soup.png', note: 'A little heat, a little tang' },
  { id: 'finger-fish', name: 'Finger Fish', category: 'Appetizers', price: 850, image: '/assets/appetizers/finger%20fish.png', note: 'Straight from the starters' },
  { id: 'buffalo-wings', name: 'Buffalo Wings', category: 'Appetizers', price: 750, image: '/assets/appetizers/buffalo%20wings.png', note: 'Made for the table' },
  { id: 'chicken-strips', name: 'Chicken Strips', category: 'Appetizers', price: 750, image: '/assets/appetizers/chicken%20strips.png', note: 'Golden, crispy, gone fast' },
  { id: 'garlic-mayo-fries', name: 'Garlic Mayo Fries', category: 'Appetizers', price: 600, image: '/assets/appetizers/garlic%20mayo%20fries.png', note: 'A side worth sharing' },
  { id: 'masala-fries', name: 'Masala Fries', category: 'Appetizers', price: 600, image: '/assets/appetizers/Masala%20fries.png', note: 'A little spice on the side' },
  { id: 'nachos', name: 'Nachos', category: 'Appetizers', price: 750, image: '/assets/appetizers/Nachos.png', note: 'The opening act' },
  { id: 'rockstar-cocktail', name: 'Rockstar Special', category: 'Cocktails', price: 750, image: '/assets/cocktail/cocktail_rock%20star%20special.png', note: 'The signature pour' },
  { id: 'mojito', name: 'Mojito', category: 'Cocktails', price: 650, image: '/assets/cocktail/cocktail_mojito.png', note: 'A refreshing classic' },
  { id: 'green-mint-crush', name: 'Ginger Mint Crush', category: 'Cocktails', price: 650, image: '/assets/cocktail/cocktail_green%20mint%20crush.png', note: 'Cool, bright, refreshing' },
  { id: 'penne-arrabiata', name: 'Penne Arrabiata Pasta', category: 'Pasta', price: 1250, image: '/assets/pastas/Penne%20arabiata%20pasta.png', note: 'A little fire in every bite' },
  { id: 'penne-alfredo', name: 'Penne Alfredo Pasta', category: 'Pasta', price: 1250, image: '/assets/pastas/Penne%20alfredo%20pasta.png', note: 'A rich, creamy classic' },
  { id: 'mexican-steak', name: 'Mexican Steak', category: 'Steaks', price: 1500, image: '/assets/steak/steak_mexican%20steak.png', note: 'One for the main event' },
  { id: 'american-steak', name: 'American Steak', category: 'Steaks', price: 1500, image: '/assets/steak/steak_american%20steak.png', note: 'An all-time favourite' },
  { id: 'chicken-pepper-steak', name: 'Chicken Pepper Steak', category: 'Steaks', price: 1500, image: '/assets/steak/steak_chicken%20pepper%20steak.png', note: 'Pepper, sizzle, repeat' },
  { id: 'mushroom-steak', name: 'Mushroom Steak', category: 'Steaks', price: 1500, image: '/assets/steak/steak_mushroom%20steak.png', note: 'A savoury favourite' },
  { id: 'rockstar-steak', name: 'Rockstar Special Steak', category: 'Steaks', price: 1500, image: '/assets/steak/rockstar_special%20steak.png', note: 'The steakhouse headliner' },
  { id: 'fish-and-chips', name: 'Fish & Chips', category: 'Seafood', price: 750, image: '/assets/seafood/fish%20and%20chips.png', note: 'A familiar classic' },
  { id: 'chicken-supreme', name: 'Chicken Supreme', category: 'Seafood', price: 1350, image: '/assets/seafood/chicken%20supreme.png', note: 'A hearty house favourite' },
  { id: 'chicken-chilli-dry', name: 'Chicken Chilli Dry', category: 'Seafood', price: 1350, image: '/assets/seafood/chicken%20chilli%20dry.png', note: 'A spicy crowd-pleaser' },
  { id: 'beef-chilli-dry', name: 'Beef Chilli Dry', category: 'Seafood', price: 1500, image: '/assets/seafood/beef%20chilli%20dry.png', note: 'Big flavour, no quiet exits' },
  { id: 'fresh-mint-margarita', name: 'Fresh Mint Margarita', category: 'Margaritas', price: 650, image: '/assets/margeritas/mint%20margerita.png', note: 'Bright, cool, and minty' },
  { id: 'strawberry-margarita', name: 'Strawberry Margarita', category: 'Margaritas', price: 650, image: '/assets/margeritas/strawberry%20margerita.png', note: 'A berry-bright classic' },
  { id: 'soft-drink', name: 'Soft Drink', category: 'Soft Drinks', price: 200, image: '/assets/soft%20drinks/soft%20drink.png', note: 'A cold classic' },
  { id: 'fresh-lime', name: 'Fresh Lime', category: 'Soft Drinks', price: 250, image: '/assets/soft%20drinks/Fresh%20lime.png', note: 'A fresh squeeze' },
  { id: 'small-water', name: 'Small Water', category: 'Soft Drinks', price: 120, image: '/assets/soft%20drinks/small%20water.png', note: 'Stay refreshed' },
  { id: 'green-tea', name: 'Green Tea', category: 'Tea & Coffee', price: 250, image: '/assets/tea%20%26%20coffee/green%20tea.png', note: 'A lighter finish' },
  { id: 'mix-tea', name: 'Mix Tea', category: 'Tea & Coffee', price: 300, image: '/assets/tea%20%26%20coffee/mix%20tea.png', note: 'Take a tea break' },
  { id: 'homemade-coffee', name: 'Home Made Coffee', category: 'Tea & Coffee', price: 850, image: '/assets/tea%20%26%20coffee/homemade%20coffee.png', note: 'A slow-down moment' },
]

export const formatPrice = (price: number) => `Rs. ${price.toLocaleString('en-PK')}`
