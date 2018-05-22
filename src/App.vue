<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand">KanbaN</a>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">
          Add Task
        </button>
        <!-- Inside modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Your Task Here</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Assign To:</label>
                    <input type="text" class="form-control" v-model="assign">
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Title:</label>
                    <input type="text" class="form-control" v-model="title">
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">Description:</label>
                    <textarea rows="5" class="form-control" v-model="description"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="insertToBacklog">Submit Task</button>
              </div>
            </div>
          </div>
        </div>
        <!-- modal closed -->
      </div>
    </nav>
    <div class="">
      <div class="row md-12">
        <!-- Backlog -->
        <div class= "col md-3">
          <div class="card mt-2 ml-2 mr-2" style="width: 19rem;">
            <div class="card-header">
              <h5 class="card-title"> <b>Backlog</b></h5>
            </div>
              <center>
              <div class="card mt-3 mb-3" style="width: 16rem;" v-for="personName of names" v-bind:key="personName['key']" v-if="personName.backlog">
                <div class="card-header">
                  <b>{{ personName.title }}</b>
                </div>
                <div class="card-body">
                  <h8><b>{{ personName.assign }}</b></h8><br>
                  <p> {{ personName.description}} </p>
                </div>
                <div class="card-footer">
                  <button class="btn btn-outline-danger btn-sm" @click="deleteName(personName['.key'])">Delete</button>
                  <button class="btn btn-outline-success btn-sm" @click="updateFromBacklog(personName['.key'])">Next</button>
                </div>
              </div>
            </center>
          </div>
        </div>
        <!-- Progress -->
        <div class= "col md-3">
          <div class="card mt-2 ml-2 mr-2" style="width: 19rem;">
            <div class="card-header">
              <h5 class="card-title"><b>Progress</b></h5>
            </div>
              <center>
                <div class="card mt-3 mb-3" style="width: 16rem;" v-for="personName of names" v-bind:key="personName['key']" v-if="personName.progress">
                  <div class="card-header">
                    <b>{{ personName.title }}</b>
                  </div>
                  <div class="card-body">
                    <h8><b>{{ personName.assign }}</b></h8><br>
                    <p> {{ personName.description}} </p>
                  </div>
                <div class="card-footer">
                  <button class="btn btn-outline-secondary btn-sm" @click="updateToBacklog(personName['.key'])">Previous</button>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteName(personName['.key'])">Delete</button>
                  <button class="btn btn-outline-success btn-sm" @click="updateFromProgress(personName['.key'])">Next</button>
                </div>
              </div>
            </center>
          </div>
        </div>
        <!-- Review -->
        <div class= "col md-3">
          <div class="card mt-2 ml-2 mr-2" style="width: 19rem;">
            <div class="card-header">
              <h5 class="card-title"><b>Review</b></h5>
            </div>
              <center>
                <div class="card mt-3 mb-3" style="width: 16rem;" v-for="personName of names" v-bind:key="personName['key']" v-if="personName.review">
                  <div class="card-header">
                    <b>{{ personName.title }}</b>
                  </div>
                  <div class="card-body">
                    <h8><b>{{ personName.assign }}</b></h8><br>
                    <p> {{ personName.description}} </p>
                  </div>
                <div class="card-footer">
                  <button class="btn btn-outline-secondary btn-sm" @click="updateToProgress(personName['.key'])">Previous</button>
                  <button class="btn btn-outline-danger btn-sm"  @click="deleteName(personName['.key'])">Delete</button>
                  <button class="btn btn-outline-success btn-sm" @click="updateFromReview(personName['.key'])">Next</button>
                </div>
              </div>
            </center>
          </div>
        </div>
        <!-- Done -->
        <div class= "col md-3">
          <div class="card mt-2 ml-2 mr-2" style="width: 19rem;">
            <div class="card-header">
              <h5 class="card-title"><b>Done!!</b></h5>
            </div>
              <center>
                <div class="card mt-3 mb-3" style="width: 16rem;" v-for="personName of names" v-bind:key="personName['key']" v-if="personName.done">
                  <div class="card-header">
                    <b>{{ personName.title }}</b>
                  </div>
                  <div class="card-body">
                    <h8><b>{{ personName.assign }}</b></h8><br>
                    <p> {{ personName.description}} </p>
                  </div>
                <div class="card-footer">
                  <button class="btn btn-outline-secondary btn-sm" @click="updateToReview(personName['.key'])">Previous</button>
                  <button class="btn btn-outline-success btn-sm" @click="deleteName(personName['.key'])">Done!</button>
                </div>
              </div>
            </center>
          </div>
        </div>
        <!-- the end -->
      </div>
    </div>
  </div>
</template>

<script>
import { namesRef } from './firebase'

export default {
  name: 'app',
  data(){
    return {
      title:'',
      description:'',
      assign:'',
      backlog:false,
      progress:false,
      review:false,
      done:false
    }
  },
  firebase:{
    names : namesRef
  },
  methods:{
    insertToBacklog(){
      namesRef.push(
        {title:this.title,
         description:this.description,
         assign:this.assign,
         backlog:true,
         progress:false,
         review:false,
         done:false
      });
      this.title = ""
      this.description = ""
      this.assign = ""
    },
    deleteName(key){
      namesRef.child(key).remove()
    },
    updateFromBacklog(key){
      namesRef.child(key).update({backlog:false,progress:true})
    },
    updateToBacklog(key){
      namesRef.child(key).update({backlog:true,progress:false})
    },
    updateFromProgress(key){
      namesRef.child(key).update({progress:false,review:true})
    },
    updateToProgress(key){
      namesRef.child(key).update({progress:true,review:false})
    },
    updateFromReview(key){
      namesRef.child(key).update({review:false,done:true})
    },
    updateToReview(key){
      namesRef.child(key).update({review:true,done:false})
    }
  }
}
</script>

<style lang="scss">

</style>
