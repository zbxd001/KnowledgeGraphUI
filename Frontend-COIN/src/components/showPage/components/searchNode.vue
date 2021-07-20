<template>
    <div class="whole">
        <div class="search">
            <el-col :span="1" class="center">
                <el-input
                        v-model="search"
                        @focus="focus"
                        @blur="blur"
                        @keyup.enter.native="searchHandler"
                        placeholder="搜索感兴趣的内容..."
                        style="width: 350px; margin-left: 10px"
                >
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="searchHandler"></i>
                </el-input>
                <el-card
                        @mouseenter="enterSearchBoxHanlder"
                        v-if="isSearch"
                        class="box-card"
                        id="search-box"
                >
                    <dl v-if="isHistorySearch">
                        <dt class="search-title" v-show="history" style="margin-top: -30px">历史搜索</dt>
                        <dt class="remove-history" v-show="history" @click="removeAllHeadHistory">
                            <i class="el-icon-delete"></i>清空历史记录
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
                        <dt class="search-title">热门搜索</dt>
                        <dd v-for="search in hotSearchList" :key="search.id">{{search}}</dd>
                    </dl>
                    <dl v-if="isSearchList">
                        <dd v-for="search in searchList" :key="search.id">{{search}}</dd>
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
        name: "searchNode",
        components: {},
        data() {
            return {
                search: "", //当前输入框的值
                isFocus: false, //是否聚焦
                hotSearchList: ["暂无热门搜索"], //热门搜索数据
                historySearchNodeList: [], //历史搜索数据
                searchList: ["暂无数据"], //搜索返回数据,
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
            isSearch() {
                return this.isFocus;
            }
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
            getThis(search){
                this.search = search
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
                this.highLight(this.search);
                //随机生成搜索历史tag式样
                let n = 3;
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
            closeHandler(search){
                this.historySearchNodeList.splice(this.historySearchNodeList.indexOf(search), 1);
                Store.saveHeadHistory(this.historySearchNodeList);
                clearTimeout(this.searchBoxTimeout);
                if (this.historySearchNodeList.length == 0) {
                    this.history = false;
                }
            },
            removeAllHeadHistory() {
                Store.removeAllHeadHistory();
            },

            highLight(context){

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
        float: left;
        padding-right: 30px;
        padding-top: 20px;
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
        height: 200px;
        margin-top: 0px;
        padding-bottom: 20px;
        float: right;
    }
</style>