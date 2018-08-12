{
  repositoryOwner(login:nehasinha44){
    id
    resourcePath
    url
    avatarUrl
    login
    
  }
}
/**************** */
{
  repository(name:"login-module",owner:"nehasinha44"){
    id
    description
    createdAt
    homepageUrl
  }
}

{
  __schema{
    queryType{
      name
      description
      fields{
        name
        description
      }
    }
  }
}
/************** */
{
  firstrepo: repository(name: "login-module", owner: "nehasinha44") {
    ...repofiids
  }
  sec: repository(name: "react-todo-list", owner: "nehasinha44") {
   ...repofiids
  }
}

fragment repofiids on Repository {
  id
  description
  createdAt
  homepageUrl
}
/********** */
// edges :- some short of conection with arrey 

{
  repository(name: "ImagePicker", owner: "Mariovc") {
    id
    description
    createdAt
    homepageUrl
    watchers(first:5) {
      edges {
        node {
          id
          name
          company
        }
      }
    }
    pullRequests(first:5) {
      edges {
        node {
          id
          author{
            avatarUrl
            login
          }
        }
      }
    }
  }
}
/*8**********/
{
  repositoryOwner(login:"gjtorikian"){
    repository(name:"ADC-Zipcode-Sorter"){
      issues(first:1){
        edges{
          node{
            id
          }
        }
      }
    }
  }
}
MDEwOlJlcG9zaXRvcnkxNjg1Mjk0

MDEwOlJlcG9zaXRvcnk4NDUxODkz

MDEwOlJlcG9zaXRvcnk4MTE4NDY0



{
  repositoryOwner(login:"gjtorikian"){
    repository(name:"Earthbound-Battle-Backgrounds-JS"){
      id
    }
  }
}
