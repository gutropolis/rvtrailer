import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';



@Injectable()
export class ApiService {

  authToken;
  user;
  cmspage;
  options;

  headers: any = {'Content-Type': 'application/json'};

  // This is for local
 //mainURL: string = 'http://localhost:3001';
  // This is for server
   mainURL: string = 'http://104.236.9.249:3001';

  constructor(private http: Http) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  //Messages
  createMessage(params) {
    return this.http.post(this.mainURL + '/api/message', params)
    .map(res => res.json());
  }

  messagesByUserId(user_id) {
    return this.http.get( this.mainURL + '/api/messagebyuserid/' + user_id)
    .map( (res: Response) => res.json());
  }

  messagesByParentId(parentId) {
    return this.http.get( this.mainURL + '/api/messagebyParentid/' + parentId)
    .map( (res: Response) => res.json());
  }

  messagesDetails(id) {
    return this.http.get( this.mainURL + '/api/message/' + id)
    .map( (res: Response) => res.json());
  }

  filterSearch(params) {
    return this.http.post(this.mainURL + '/api/filterSearch', params)
    .map(res => res.json());
  }
// For mailing perpose

Email(params) {
  return this.http.post(this.mainURL + '/api/send', params)
  .map(res => res.json());


}
  getAllUsers() {
    return this.http.get(this.mainURL + '/api/user')
      .map(res => res.json());
  }
  getLimitUser(listLimit = 10) {
    
        let url:string = this.mainURL + '/api/users/'+listLimit;
        console.log(url);
        return this.http.get(url)
          .map( (res: Response) => res.json());
  }


  showUser(id) {
      let url: string = this.mainURL + '/api/user/' + id;
      return this.http.get(url).map( (res: Response) => res.json ());
  }


  addFeedback(data) {
    return new Promise((resolve, reject) => {
     
        this.http.post( this.mainURL + '/api/feedback',data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
  getAllFeedback() {
    return new Promise((resolve, reject) => {
      this.http.get( this.mainURL + '/api/feedback')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    }
    deleteFeedback(id) {
      return new Promise((resolve, reject) => {
            this.http.delete( this.mainURL + '/api/view-feedback/' + id)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }

      viewFeedback(id) {
        return new Promise((resolve, reject) => {
            this.http.get( this.mainURL + '/api/view-feedback/' + id)
              .map(res => res.json())
              .subscribe(res => {
                resolve(res)
            }, (err) => {
              reject(err);
            });
        });
      }
      updateFeedback(id, data) {
        return new Promise((resolve, reject) => {
            this.http.put( this.mainURL + '/api/edit-feedback/' + id, data)
              .map(res => res.json())
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }
      getRetingbyId() {
        return new Promise((resolve, reject) => {
          this.http.get( this.mainURL + '/api/feedbacks')
            .map(res => res.json())
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
          });
        }


  addUser(data) {
    return new Promise((resolve, reject) => {
     
        this.http.post( this.mainURL + '/api/saveuser',data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateUser(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.mainURL + '/api/user/' + id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/api/user/' +id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  login(user) {
      return this.http.post( this.mainURL + '/api/login', user)
          .map(res => res.json());
  }

  clientLogin(user) {
      return this.http.post( this.mainURL + '/api/clientLogin', user)
          .map(res => res.json());
  }

  userByEmail(email) {
    return this.http.get( this.mainURL + '/api/userbyemail/' + email )
      .map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  viewPassword() {
    this.createAuthenticationHeaders();
    return this.http.get('/api/viewPass', this.options).map(res => res.json());
  }

  changePassword(id, users) {
    console.log(users);
    return new Promise((resolve, reject) => {
        this.http.put('/api/changePass/', users)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  onSubmitSpecification() {
    var listing = JSON.parse(localStorage.getItem('listing'));
    return listing;
  }

 onSubmitStep2() {
    var listing12 = JSON.parse(localStorage.getItem('listing12'));
    return listing12;
  }


  addListTrailer(data) {
      return this.http.post( this.mainURL + '/api/list_trailers/', data)
      .map(res => res.json());
  }

  //Manage rental type

  addRental(data) {
    return new Promise((resolve, reject) => {
        this.http.post( this.mainURL + '/api/rental_type', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }


  getAllRental() {
    return new Promise((resolve, reject) => {
      this.http.get( this.mainURL + '/api/rental_type')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    }

    getLimitRental(listLimit = 10) {
      
          let url:string = this.mainURL + '/api/rental_type/'+listLimit;
          console.log(url);
          return this.http.get(url)
            .map( (res: Response) => res.json());
    }


 getRvTypeByRental(id) {
	 console.log(this.mainURL + '/api/rvtypebyrental/' + id);
    return new Promise((resolve, reject) => {
      this.http.get( this.mainURL + '/api/rvtypebyrental/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => { console.log(err);
          reject(err);
        });
      });
    }
    showRental(id) {
      return new Promise((resolve, reject) => {
          this.http.get( this.mainURL + '/api/show_rental_type/' + id)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res)
          }, (err) => {
            reject(err);
          });
      });
    }
     
    getEditRental(id) {
      return new Promise((resolve, reject) => {
          this.http.get( this.mainURL + '/api/edit_rental_type/' + id)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res)
          }, (err) => {
            reject(err);
          });
      });
    }

    updateRental(id, data) {
      return new Promise((resolve, reject) => {
          this.http.put( this.mainURL + '/api/edit_rental_type/' + id, data)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
    }

    deleteRental(id) {
      return new Promise((resolve, reject) => {
            this.http.delete( this.mainURL + '/api/view_rental_type/' + id)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }



      //Manage Feature
      addFeature(data) {
        return new Promise((resolve, reject) => {
            this.http.post( this.mainURL + '/api/features', data)
              .map(res => res.json())
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }



      getAllFeature() {
        return new Promise((resolve, reject) => {
          this.http.get( this.mainURL + '/api/features')
            .map(res => res.json())
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
          });
        }
        getFeatureVlimit(listLimit = 10) {
          
              let url:string = this.mainURL + '/api/features/'+listLimit;
              console.log(url);
              return this.http.get(url)
                .map( (res: Response) => res.json());
        }
        


        viewFeature(id) {
          return new Promise((resolve, reject) => {
              this.http.get( this.mainURL + '/api/view-features/' + id)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res)
              }, (err) => {
                reject(err);
              });
          });
        }

        getEditFeature(id) {
          return new Promise((resolve, reject) => {
              this.http.get( this.mainURL + '/api/edit_features/' + id)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res)
              }, (err) => {
                reject(err);
              });
          });
        }

    
        updateFeature(id, data) {
          return new Promise((resolve, reject) => {
              this.http.put( this.mainURL + '/api/view-features/' + id, data)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err);
                });
          });
        }
    

        deleteFeature(id) {
          return new Promise((resolve, reject) => {
                this.http.delete( this.mainURL + '/api/view-features/' + id)
                  .subscribe(res => {
                    resolve(res);
                  }, (err) => {
                    reject(err);
                  });
            });
          }

// manage cms

  getAllCmsPages() {
    return new Promise((resolve, reject) => {
      this.http.get( this.mainURL + '/api/cmspage')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    }

    getLimitCmsPages(listLimit = 10) {
      
          let url:string = this.mainURL + '/api/cmspages/'+listLimit;
          console.log(url);
          return this.http.get(url)
            .map( (res: Response) => res.json());
    }

  showCmsPage(id) {
    return new Promise((resolve, reject) => {
        this.http.get( this.mainURL + '/api/cmspage/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  addCmsPage(data) {
    return new Promise((resolve, reject) => {
        this.http.post( this.mainURL + '/api/savecmspage', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateCmsPage(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put( this.mainURL + '/api/cmspage/' + id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteCmsPage(id) {
  return new Promise((resolve, reject) => {
        this.http.delete( this.mainURL + '/api/cmspage/' + id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  searchTrailers(searchTerms) {
    console.log(searchTerms.from);
    let params = new URLSearchParams();
    params.set('location', searchTerms.location);

    if(searchTerms.from) {
      params.set('from', searchTerms.from);
      params.set('to', searchTerms.to);

    }

    params.toString();

    let url:string = this.mainURL + '/api/search?' + params;
    console.log(url);
    return this.http.get(url)
      .map( (res: Response) => res.json());
  }

  myFav(user_id) {
    return this.http.get( this.mainURL + '/api/fav/' + user_id)
    .map( (res: Response) => res.json());
  }

  deleteAllmyFav(user_id) {
    return this.http.delete( this.mainURL + '/api/deleteAllFav/' + user_id)
    .map( (res: Response) => res.json());
  }

  getTrailersByIds(ids) {
    console.log(ids);
    return this.http.post( this.mainURL + '/api/trailersbyids/', ids)
      .map( res => res.json() );
  }

  getListTrailer() {
    
    return new Promise((resolve, reject) => {
      this.http.get( this.mainURL + '/api/trailers')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
  }

  getAllListTrailer(listLimit = 10) {

    let url:string = this.mainURL + '/api/trailers/' + listLimit;
    console.log(url);
    return this.http.get(url)
      .map( (res: Response) => res.json());

    // return new Promise((resolve, reject) => {
    //   this.http.get('/api/list_trailers')
    //     .map(res => res.json())
    //     .subscribe(res => {
    //       resolve(res);
    //     }, (err) => {
    //       reject(err);
    //     });
    //   });
    }

  // showListTrailer(id) {
  //   return new Promise((resolve, reject) => {
  //       this.http.get( this.mainURL + '/api/list_trailers/' + id)
  //         .map(res => res.json())
  //         .subscribe(res => {
  //           resolve(res)
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  showListTrailer(id) {
    return this.http.get( this.mainURL + '/api/list_trailers/' + id)
      .map(res => res.json());
  }

  showFavListTrailer(FavTrailer_id) {
      return this.http.post( this.mainURL + '/api/list_trailersbyUserId/', FavTrailer_id)
      .map(res => res.json());
  }

  updateListTrailer(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put( this.mainURL + '/api/list_trailers/' + id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteListTrailer(id) {
    return new Promise((resolve, reject) => {
        this.http.delete( this.mainURL + '/api/list_trailers/'+ id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  ListByUserId(id) {
      let url: string = this.mainURL + '/api/trailersByUserId/' + id;
      return this.http.get(url).map( (res: Response) => res.json ());
  }

  ListByFavId(id) {
      let url: string = this.mainURL + '/api/favouritesByUserId/' + id;
      return this.http.get(url).map( (res: Response) => res.json ());
  }

  addFavourite(favourite) {
      return this.http.post( this.mainURL + '/api/favourite/', favourite)
      .map(res => res.json());
  }

  getFav(params) {
      return this.http.post( this.mainURL + '/api/getfavourite/', params)
      .map(res => res.json());
  }

  delFav(id) {
    return this.http.delete( this.mainURL + '/api/delfavourite/' + id)
      .map(res => res.json());
  }

  getPackages() {
    return this.http.get( this.mainURL + '/api/Packages/')
      .map(res => res.json());
  }

  addPackage(data) {
        return new Promise((resolve, reject) => {
            this.http.post( this.mainURL + '/api/add-package', data)
              .map(res => res.json())
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }

      deletePackage(id) {
        return new Promise((resolve, reject) => {
              this.http.delete( this.mainURL + '/api/Packages/' + id)
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err);
                });
          });
        }

        getViewPackage(id) {
          return new Promise((resolve, reject) => {
              this.http.get( this.mainURL + '/api/view-package/' + id)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res)
              }, (err) => {
                reject(err);
              });
          });
        }

        getEditPackage(id,data) {
          return new Promise((resolve, reject) => {
              this.http.get( this.mainURL + '/api/edit-package/' + id,data)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res)
              }, (err) => {
                reject(err);
              });
          });
        }

        updatePackage(id, data) {
          return new Promise((resolve, reject) => {
              this.http.put( this.mainURL + '/api/edit-package/' + id, data)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err);
                });
          });
        }


  getNewsLetters(data) {
      return this.http.post( this.mainURL + '/api/newsLetter', data)
          .map(res => res.json());
  }
      getCity() {
    
        let url:string = this.mainURL + '/api/list_trailer_locs';
        console.log(url);
        return this.http.get(url)
          .map( (res: Response) => res.json());
    
       
        }

        addContact(data) {
          return new Promise((resolve, reject) => {
           
              this.http.post( this.mainURL + '/api/contact-us',data)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err);
                });
          });
        }

        getContactus() {
          return new Promise((resolve, reject) => {
            this.http.get( this.mainURL + '/api/contact-us')
              .map(res => res.json())
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
            });
          }
}
