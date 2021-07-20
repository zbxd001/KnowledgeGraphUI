<template>
    <div class="whole">
        <div class="search">
            <el-col :span="1" class="center">
                <el-input
                        v-model="search"
                        @focus="focus"
                        @blur="blur"
                        @keyup.enter.native="searchHandler"
                        @wheel="true"
                        placeholder="语义搜索"
                        style="width: 350px; margin-left: 10px"
                >
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="searchHandler"></i>
                </el-input>
                <el-card
                        @mouseenter="enterSearchBoxHanlder"
                        v-if="isFocus"
                        class="box-card"
                        id="search-box"
                >
                    <dl v-if="isHistorySearch">
                        <dt class="search-title" v-show="history" style="margin-top: -30px">历史搜索</dt>
                        <dt class="remove-history" v-show="history" @click="removeAllHeadHistory">
                            <i class="el-icon-delete">清空历史记录</i>
                        </dt>
                        <el-tag
                                v-for="search in historySearchNodeList"
                                :key="search.id"
                                closable
                                :type="search.type"
                                @close="closeHandler(search)"
                                style="margin-right:5px; margin-bottom:5px;"
                                @click.native="getThis(search.name)"
                        >{{search.name}}</el-tag>
                        <br>
                    </dl>
                    <dl v-if="isSearchList">
                        <dt class="search-title" style="margin-top: -30px ;margin-left: -220px;">您还可以搜：</dt>
                        <el-tag
                                v-for="search in suggestList"
                                :key="search.id"
                                :type="search.type"
                                closable
                                @close="closeHandler1(search)"
                                style=""
                                @click.native="getThis(search.name)"
                        >{{search.name}}</el-tag>
                        <dt class="search-title" style="margin-top:10px; color: black;margin-left: 20px">查询列表</dt>
                        <el-tag
                                v-for="search in searchList"
                                :key="search.id"
                                :type="search.type"
                                closable
                                @close="closeHandler2(search)"
                                style="margin-right:0px; margin-bottom:5px; width: 250px"
                                @click.native="getThis(search.name)"
                        >{{search.name}}</el-tag>
                    </dl>
                </el-card>
            </el-col>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import Store from "../../../utils/store";
    import {getObjectList, getRelationList} from "../../../tool/MapHelper";
    import {searchTag2,modRealObject} from "../../../tool/DrawTool"
    import {searchRelation2,paintRelation} from "../../../tool/Order"
    export default {
        name: "smartSearch",
        components: {},
        data() {
            return {
                search: "", //当前输入框的值
                isFocus: false, //是否聚焦
                suggestList: [], //热门搜索数据
                historySearchNodeList: [], //历史搜索数据
                searchList: [], //搜索返回数据,
                history: false,
                types: ["", "success", "info", "warning", "danger"], //搜索历史tag式样
                searchNodesResult: [],  //搜索节点结果
                markedNodes: [],
                ummarkedNodes: [],
                realObjectList: getObjectList(),
                relationList: getRelationList(),
            };
        },
        computed: {
            ...mapGetters([
                'nodesData',
                'linksData',
                'mode',
                'options',
                'value',
            ]),
            ...mapMutations([
                'set_options',
                'set_value',
            ]),
            isHistorySearch() {
                return this.isFocus && !this.search;
            },
            isSearchList() {
                return this.isFocus && this.search;
            },
            // isSearch() {
            //     return this.isFocus;
            // }
        },
        mounted() {
        },
        methods: {
            focus() {
                this.isFocus = true;
                this.historySearchNodeList =
                    Store.loadHeadHistory() == null ? [] : Store.loadHeadHistory();
                this.history = this.historySearchNodeList.length == 0 ? false : true;
            },
            blur() {
                var self = this;
                this.searchBoxTimeout = setTimeout(function () {
                    self.isFocus = false;
                }, 300);
            },
            enterSearchBoxHanlder() {
                clearTimeout(this.searchBoxTimeout);
            },
            searchHandler() {
                if (this.search === ''){
                    this.suggestList = []
                    this.searchList = []
                }

                this.highLight(this.search);
                //随机生成搜索历史tag式样
                this.setTag(2)

                //进行边缘节点查询
                this.searchSon(this.search)
                this.setSearch(this.search)
                // this.suggestList = []

            },

            setTag(n){
                let exist = this.historySearchNodeList.filter(value => {
                    return value.name == this.search;
                }).length == 0
                    ? false
                    : true;
                if (!exist) {
                    this.historySearchNodeList.push({ name: this.search, type: this.types[n] });
                    Store.saveHeadHistory(this.historySearchNodeList);
                }
                this.history = this.historySearchNodeList.length == 0 ? false : true;
            },
            getThis(search){
                this.search = search
                this.isFocus = true
                this.suggestList = []
                this.searchList = []
            },
            closeHandler(search){
                this.historySearchNodeList.splice(this.historySearchNodeList.indexOf(search), 1);
                Store.saveHeadHistory(this.historySearchNodeList);
                // clearTimeout(this.searchBoxTimeout);
                if (this.historySearchNodeList.length == 0) {
                    this.history = false;
                }
            },
            closeHandler1(search){
                this.suggestList.splice(this.suggestList.indexOf(search), 1);
            },
            closeHandler2(search){
                this.searchList.splice(this.searchList.indexOf(search), 1);
            },
            removeAllHeadHistory() {
                Store.removeAllHeadHistory();
            },

            highLight(context){
                console.log(this.relationList)
                console.log(this.realObjectList)
                for(let obj of this.realObjectList){
                    if(context==''){
                        modRealObject(obj)
                    }
                    else{
                        if(obj.name.search(context)!=-1) {
                            searchTag2(obj)
                        }
                    }
                }
                for(let relation1 of this.relationList){
                    if(context==''){
                        paintRelation(relation1)
                    }
                    else{
                        if(relation1.name.search(context)!=-1) {
                            console.log("测试搜索关系")
                            console.log(relation1)
                            searchRelation2(relation1)
                        }
                    }
                }
            },
            filter1(name){
                let exist = this.suggestList.filter(value => {
                    return value.name == name;
                }).length == 0
                    ? false
                    : true;
                return exist
            },
            filter2(name){
                let exist = this.searchList.filter(value => {
                    return value.name == name;
                }).length == 0
                    ? false
                    : true;
                return exist
            },


            searchSon(context){
                for(let obj of this.relationList) {
                    if((obj.name.search(context) != -1 || context.search(obj.name) != -1)){
                        for(let obj3 of this.realObjectList){
                            if (obj3.ID === obj.start){
                                if(!this.filter1(obj3.name)) {
                                    this.suggestList.push({name: obj3.name, type: this.types[1]});
                                }
                            }
                            else if(obj3.ID === obj.end) {
                                if (!this.filter1(obj3.name)) {
                                    this.suggestList.push({name: obj3.name, type: this.types[1]})
                                }
                            }
                        }
                    }
                    for (let obj2 of this.realObjectList) {
                        if (obj2.ID === obj.end & (obj2.name.search(context) != -1 || context.search(obj2.name) != -1)) {
                            this.suggestList.push({name: obj.name, type: this.types[1]});
                            for(let obj2 of this.realObjectList) {
                                if (obj2.ID === obj.start) {
                                    if (!this.filter1(obj2.name)) {
                                        this.suggestList.push({name: obj2.name, type: this.types[1]});
                                    }
                                }
                            }

                            // Store.saveHeadHistory(this.suggestList);
                        }
                        if (obj2.ID === obj.start & (obj2.name.search(context) != -1 || context.search(obj2.name) != -1)) {
                            this.suggestList.push({name: obj.name, type: this.types[1]});
                            for(let obj2 of this.realObjectList) {
                                if (obj2.ID === obj.end) {
                                    if (!this.filter1(obj2.name)) {
                                        this.suggestList.push({name: obj2.name, type: this.types[1]});
                                    }
                                }
                            }

                        }

                    }
                }
                console.log(this.suggestList)
            },

            setSearch(context){
                for(let obj of this.relationList){
                    if((obj.name.search(context) != -1 || context.search(obj.name) != -1)){
                        for(let obj3 of this.realObjectList){
                            if(obj3.ID === obj.start){
                                let msg = obj3.name
                                for(let obj4 of this.realObjectList){
                                    if (obj4.ID === obj.end) {
                                        msg = msg + obj.name + obj4.name
                                        if (!this.filter2(msg)) {
                                            this.searchList.push({name: msg, type: this.types[0]})
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for(let obj2 of this.realObjectList) {
                        if (obj2.ID === obj.end & (obj2.name.search(context) != -1 || context.search(obj2.name) != -1)) {
                            for(let obj3 of this.realObjectList) {
                                if (obj.start === obj3.ID) {
                                    let msg = obj3.name + obj.name + obj2.name
                                    if (!this.filter2(msg)) {
                                        this.searchList.push({name: msg, type: this.types[0]})
                                    }
                                }
                            }
                        }
                        if (obj2.ID === obj.start & (obj2.name.search(context) != -1 || context.search(obj2.name) != -1)) {
                            for(let obj3 of this.realObjectList) {
                                if (obj.end === obj3.ID) {
                                    let msg = obj2.name + obj.name + obj3.name
                                    if (!this.filter2(msg)) {
                                        this.searchList.push({name: msg, type: this.types[0]})
                                    }
                                }
                            }
                        }
                    }
                }
                console.log(this.searchList)
            }
        }
    }
</script>

<style scoped>
    .whole{
        display: block;
        /*border: solid 1px black;*/
    }
    .search{
        float: right;
        padding-right: 15px;
        padding-top: 40px;
        justify-content: flex-end;
    }

    .search-title {
        color: #bdbaba;
        font-size: 15px;
        margin-bottom: 5px;
        margin-left: -250px;
    }
    .remove-history {
        color: #bdbaba;
        font-size: 15px;
        float: right;
        margin-top: -22px;
    }
    #search-box {
        position: absolute;
        margin-left: 10px;
        width: 345px;
        height: 180px;
        margin-top: 0px;
        padding-bottom: 20px;
        float: right;
        overflow: auto;
    }
</style>