import { useEffect, useState } from 'react'

function Product({ id, name, price, category_id, onReadClick, onEditClick, onDeleteClick }){
  return (
    <>
      <td>{name}</td> 
      <td>{price}</td> 
      <td>{category_id}</td> 
      <td>
        <button className='btn btn-primary m-r-10px' data-id={id} onClick={onReadClick}><span className='glyphicon glyphicon-eye-open'></span> Read</button> 
        <span> </span>
        <button className='btn btn-info m-r-10px' data-id={id} onClick={onEditClick}><span className='glyphicon glyphicon-edit' onClick={onEditClick}></span> Edit</button>
        <span> </span>
        <button className='btn btn-danger' data-id={id} onClick={onDeleteClick}><span className='glyphicon glyphicon-remove'></span> Delete</button>
      </td> 
    </>
  )
} 

function FormAuth({modToken}){
  const [user, setUser] = useState({"email" : "", "password" : ""});
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if(login){
      fetch('http://localhost:3000/user/connexion', 
      { 
        method: 'POST' ,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(rep => rep.json())
        .then(rep => {
          localStorage.setItem('jwt-token', rep.token)
          modToken(localStorage.getItem('jwt-token'));
          //modToken(rep.token);
          setLogin(false)
        })
        .catch(err => {console.log(err)});
    }
  }, [login]);

  function handleConnexion(e){ 
    setLogin(true);
    e.preventDefault();
  }

  return (
    <>
      <form method='post'>
          <label htmlFor='text'>Courriel</label>
          <input type='text' id='courriel' value={user.email || ""} onChange={(e) => {
            setUser(previousState => {
              return {...previousState, email: e.target.value}
            })
            
          }}/>
          <label htmlFor='pass'>Mot de passe</label>
          <input type='password' id='pass' value={user.password || ""} onChange={(e) => {
            setUser(previousState => {
              return {...previousState, password: e.target.value}
            })
          }}/>
          <button id='create-product' className='btn btn-primary pull-right m-b-15px' onClick={e=>handleConnexion(e)}>
            <span className='glyphicon glyphicon-plus'></span> Connect
          </button>
        </form>
    </>
  )
}

function App() {

  const [produits, setProduits] = useState(null);
  const [read, setRead] = useState(null);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [update, setUpdate] = useState(null);
  const [create, setCreate] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [search, setSearch] = useState();
  const [searchProduct, setSearchProduct] = useState(false);
  //const [token, setToken] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt-token'));

  useEffect(() => {
    if(read || edit){
      fetch('http://localhost:3000/product/' + (read ? read : edit), 
      { 
        method: 'GET',
        headers: {
          'authorization': token
        }
      })
        .then(rep => rep.json())
        .then( rep => {
          setProduits(rep);
        })
        .catch(err => console.log(err));
    }else if(del){
      fetch('http://localhost:3000/product/' + del, 
      { 
        method: 'DELETE',
        headers: {
          'authorization': token
        }
       })
        .then(rep => rep.json())
        .then( rep => {
          setDel(null);
        })
        .catch(err => console.log(err));
    }else if(update){
      fetch('http://localhost:3000/product/' + update, 
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify(
          {
            "name": produits.name,
            "description": produits.description,
            "category_id": produits.category_id,
            "price": produits.price
          }
        ) 
      })
        .then(() => setUpdate(null));
    }else if(addProduct){
      fetch('http://localhost:3000/product/', 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify(
          {
            "name": produits.name,
            "description": produits.description,
            "category_id": produits.category_id,
            "price": produits.price
          }
        ) 
      })
        .then(() => setAddProduct(false));
    }else if(search){
      fetch('http://localhost:3000/product/s/' + search, 
      { 
        method: 'GET',
        headers: {
          'authorization': token
        }
       })
        .then(rep => rep.json())
        .then( rep => {
          const liste = rep.slice();
          setProduits(liste);
          setSearch(null);
        })
        .catch(err => console.log(err));  
    }else if(token){
      fetch('http://localhost:3000/product', 
      { 
        method: 'GET',
        headers: {
          'authorization': token
        } 
      })
        .then(rep => rep.json())
        .then( rep => {
          const liste = rep.slice();
          setProduits(liste);
        })
        .catch(err => console.log(err));
    }

    return () => {;}
  }, [read, edit, del, update, addProduct, searchProduct, token]);

  function handleReadClick(i){
    setRead(i);
  }

  function handleEditClick(i){
    setEdit(i);
  }

  function handleDeleteClick(i){
    if(confirm("Are you sure?"))
      setDel(i);
  }

  function handleProducts(){
    if(read)
      setRead(null);
    else if(edit)
      setEdit(null);
    else if(create)
      setCreate(false);
  }

  function handleCreate(){
    setCreate(true);
  }

  function handleSubmit(){
    if(edit){
      setUpdate(edit);
      setEdit(null);
    }else{
      setCreate(false);
      setAddProduct(true);
    }
  }

  function handleSearch(e){
    if(search){
      setSearchProduct(true);
    }else{
      setSearchProduct(false);
    }
    e.preventDefault();
  }

  function handleLogout(){
    localStorage.removeItem('jwt-token');
    setToken(null);
  }

  if(token){
    if(read){
      return(
        <>
          <div className='container'>
            <div className='page-header'>
              <h1 id='page-title'>Product Details </h1>
              <div id='page-content'>
                <div id='read-products' className='btn btn-primary pull-right m-b-15px read-products-button' onClick={handleProducts}>
                  <span className='glyphicon glyphicon-list'></span> Read Products
                </div>
                <table className='table table-bordered table-hover'>
                  <tbody>
                      <tr>
                        <td>Name</td><td>{produits.name}</td>
                      </tr>
                      <tr>
                        <td>Price</td><td>{produits.price}</td>
                      </tr>
                      <tr>
                        <td>Description</td><td>{produits.description}</td>
                      </tr>
                      <tr>
                        <td>Category</td><td>{produits.category_id}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )
    } else if(edit || create){
      return(
        <>
          <div className='container'>
            <div className='page-header'>
              <h1 id='page-title'>{edit ? "Edit Product" : "Create Product"}</h1>
              <div id='page-content'>
                <div id='read-products' className='btn btn-primary pull-right m-b-15px read-products-button' onClick={handleProducts}>
                  <span className='glyphicon glyphicon-list'></span> Read Products
                </div>
                <form method='post' action='#'>   
                  <table className='table table-bordered table-hover'>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td><input 
                              type='text' 
                              value={produits.name || ""} 
                              onChange={(e) => {
                                setProduits(previousState => {
                                  return {...previousState, name: e.target.value}
                                } );
                              }}
                        /></td>                                                                  
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td><input 
                              type='number' 
                              value={produits.price || ""} 
                              onChange={(e) => {
                                setProduits(previousState => {
                                  return {...previousState, price: e.target.value}
                                } );
                              }}
                            />
                        </td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td><input 
                              type='text' 
                              value={produits.description || ""} 
                              onChange={(e) => {
                                setProduits(previousState => {
                                  return {...previousState, description: e.target.value}
                                } );
                              }}
                            />
                        </td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td><input 
                              type='number' 
                              value={produits.category_id || ""} 
                              onChange={(e) => {
                                setProduits(previousState => {
                                  return {...previousState, category_id: e.target.value}
                                } );
                              }}
                            />
                        </td>
                      </tr>
                      <tr>
                        <td></td><td>
                          <button type='submit' className='btn btn-info' onClick={handleSubmit}>
                            <span className='glyphicon glyphicon-edit'></span>
                            { edit ? "Update Product" : "Create Product" }
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </>
      )
    }else if(Array.isArray(produits) && !read && !edit && !del){
      return (
        <>
          <div className='container'>
            <div className='page-header'>
              <h1 id='page-title'>Read Products</h1>
              <div id='page-content'>
              <form id='search-product-form' action='#' method='get'>
                  <div className='input-group pull-left w-30-pct'>
                  <input 
                    type='text' 
                    value={search || ""} 
                    name='keywords' 
                    className='form-control product-search-keywords' 
                    placeholder='Search products...' 
                    onChange={(e) => {
                      setSearch(e.target.value)}
                    }   
                  />
                    <span className='input-group-btn'>
                      <button type='submit' className='btn btn-default' onClick={(e) => handleSearch(e)}>
                        <span className='glyphicon glyphicon-search'></span>
                        Search
                      </button>
                    </span>
                  </div>
                </form>
                <button id='create-product' className='btn btn-primary pull-right m-b-15px create-product-button' onClick={handleCreate}>
                  <span className='glyphicon glyphicon-plus'></span> Create Product
                </button>
                <table className='table table-bordered table-hover'>
                  <thead>
                    <tr>
                      <th className='w-25-pct'>Name</th>
                      <th className='w-10-pct'>Price</th>
                      <th className='w-15-pct'>Category</th>
                      <th className='w-25-pct text-align-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produits.map((produit, index) => (
                      <tr key={index}>
                        <Product 
                          id={produit._id} 
                          name={produit.name} 
                          price={produit.price} 
                          category_id={produit.category_id} 
                          onReadClick={() => handleReadClick(produit._id)} 
                          onEditClick={() => handleEditClick(produit._id)} 
                          onDeleteClick={() => handleDeleteClick(produit._id)}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      )
    }
  }else{
    return(
      <FormAuth modToken={setToken}/>
    )
  }
}
export default App
