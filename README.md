<div align="center">
  <a href="nexup.png">
<img src="assets/nexup.png" width="200" alt="Nexup" />
  </a>
</div>
<br/>

<div align="center">
  <h1>Nexup Frontend Challenge</h1>
</div>
<p align="center">
  <img src="https://img.shields.io/badge/react-18.3.1-%23757575?logo=React" alt="React.js"/>
  <img src="https://img.shields.io/badge/typescript-4.9.5-%23757575?logo=Typescript" alt="Npm"/>
  
</p>

This is a challenge for the recruitment process at the **Nexup** team.

#### Main Task

- Create a category filter for a list of products.
- Display the products using a table.

#### Optional Tasks

- Implement a responsive design.
- Simulate an API call.
- Add a stock filter.
- Include a full-text search input.

## Table of Contents

- Instalation
- Key Principles Used During Development

## Instalation

First clone the repository and then hit the command `$ npm install` to get the necessary to build components.

## Key Principles Used During Development

The main goal was to create a piece of functionality that feels as realistic as possible.  
To achieve this, I implemented several architectural decisions.

The first one was to use a context to centralize the product logic and avoid prop drilling.

I believe that components shouldn't handle complex logic — they should focus solely on displaying the necessary information.  
That’s another reason why they consume the functions they need from the context: to adhere to the **Single Responsibility Principle** from the SOLID principles.

Along with the previous point, inside the context I split the logic into atomic functions to ensure each one has a single responsibility. For example:

```typescript
const changeProductCategoryFilter = useCallback(
    async (category: ProductCategory | '') => {
      setSelectedCategory(category || undefined);
    },
    [],
  );

  const changeStockOptionFilter = useCallback(
    async (stockOption: Stock | '') => {
      setSelectedStock(stockOption || undefined);
    },
    [],
  );

  const handleProductSearch = useCallback((productSearch: string) => {
    setSearch(productSearch);
  }, []);
```

Instead of having one big function to manage all filters, I created a separate function for each one.  
These functions are then consumed from the **Category Filter** component.  
This approach encapsulates each piece of functionality and ensures that the component responsible for displaying data doesn’t need to worry about the filtering logic.

### Why I Used `useCallback` and `useMemo`

To optimize the performance and stability of the context, I used both `useCallback` and `useMemo` strategically.

#### `useCallback`

I wrapped all handler functions like `getProducts`, `changeProductCategoryFilter`, `changeStockOptionFilter`, and `handleProductSearch` using `useCallback`.  
This ensures that these functions maintain the **same reference between re-renders**, unless their dependencies change.

This is important for two main reasons:

1. **Avoid unnecessary re-renders** in components that consume the context.
2. **Preserve function identity**, which is useful when:
   - Passing these functions as props.
   - Including them as dependencies in `useEffect`, `useMemo`, or other `useCallback` calls.

Example:

```tsx
const getProducts = useCallback(
    async (page: PaginateInformation) => {
      try {
        setIsProductsLoading(true);
        const finalPageInformation = page || PAGE_INFORMATION_INITIAL_STATE;

        const { products: fetchedProducts, totalPages } =
          await new Promise<PaginatedProductResult>((resolve) => {
            setTimeout(async () => {
              const data = await getProductList(
                finalPageInformation,
                selectedCategory,
                selectedStock,
                search,
              );
              resolve(data);
            }, 500);
          });

        setProducts(fetchedProducts);
        setPaginateInformation({
          ...page,
          maxPage: totalPages,
        });
      } catch (error) {
        setProductsFetchError(true);
      } finally {
        setIsProductsLoading(false);
      }
    },
    [search, selectedCategory, selectedStock],
  );
```

#### `useMemo`

I used `useMemo` to memoize the value passed to the `ProductsContext.Provider`.  
This prevents unnecessary recalculations and re-renders of all components that consume the context whenever the provider itself re-renders.

By memoizing the `value` object, I ensure that the reference remains stable **unless one of its dependencies actually changes**.  
This is key to **preventing unnecessary updates** in the entire tree that consumes this context.

Example:

```tsx
const value = useMemo(
  () => ({
    products,
    getProducts,
    changeProductCategoryFilter,
    changeStockOptionFilter,
    isProductsLoading,
    productsFetchError,
    selectedCategory,
    selectedStock,
    handleProductSearch,
  }),
  [
    products,
    getProducts,
    changeProductCategoryFilter,
    changeStockOptionFilter,
    isProductsLoading,
    productsFetchError,
    selectedCategory,
    selectedStock,
    handleProductSearch,
  ],
);
```

### Custom Hook: `useProducts`

To simplify and standardize access to the `ProductsContext`, I created a custom hook:

```tsx
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
```

This provides:

- A cleaner and reusable way to access context values.
- Safety, by ensuring the hook is used inside the correct provider.
- A layer of abstraction, which reduces coupling between components and context.

Conceptually, it also aligns with the **Dependency Inversion Principle** from SOLID:
Components don’t depend directly on the low-level implementation (`ProductsContext`), but on an abstracted hook (`useProducts`).

### Products API

To simulate an API, I extended the original `.ts` file provided at the beginning of the test by adding logic to emulate realistic behavior.  
The function `getProductList` was created to receive query parameters and apply three filters accordingly.  
This results in a **3N complexity**, since it loops over the product list a maximum of three times — which is a performant and acceptable solution for the scope of this challenge.

Inside the context, the `getProducts` function simply passes the parameters to `getProductList`, since filtering is typically the backend's responsibility.  
To better simulate a real-world API call, I also added a `setTimeout` to mimic the delay of a request being processed by a server.

### Shared Folder

As in real-world projects, I created a `shared` folder containing components that can be reused across the entire application.  
This includes components like `Chip` and `Spinner`, which are very common in many UI libraries.

### Barrel Files

To simplify and standardize imports across the application, I used **barrel files**.

A barrel file is an `index.ts` that re-exports modules from a folder, allowing other parts of the app to import from a single entry point instead of referencing individual files.

For example, instead of importing like this:

```tsx
import { Chip } from '../../shared/Chip';
import { Spinner } from '../../shared/Spinner';
```

We write:

```tsx
import { Chip, Spinner } from '../../shared';
```

This improves readability, keeps import paths clean, and makes it easier to scale and maintain the codebase as the project grows.

### CSS Modules

For styling, I used **CSS Modules**, which allow for locally scoped styles by default.  
This prevents class name collisions and makes it easier to maintain styles in larger applications.

Each component has its own `.module.css` file, and styles are imported like this:

```tsx
import styles from './productList.module.css';

return <div className={styles.tableContainer}>...</div>;
```

This approach keeps styles tightly coupled to their respective components, encouraging better modularity and separation of concerns.

### Commit Convention

For commit messages, I followed the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

This standard provides a consistent way to structure commit messages, making it easier to understand the history of changes, automate changelogs, and integrate with tools like semantic versioning.

Examples:

- `feat: added challenge functionalities`
- `fix: linting problems`
- `refactor: splited css, responsive, spinner, not found message`
