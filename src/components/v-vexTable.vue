<template>
  <div>
    <vxe-table :data="tableData">
      <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
      <vxe-table-column field="name" title="名字"></vxe-table-column>
      <vxe-table-column field="sex" title="性别"></vxe-table-column>
      <vxe-table-column field="address" title="地址"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: 10001,
          name: '名字1',
          role: '角色',
          sex: '男',
          address: '深圳市 圳市 市 xxx'
        },
        {
          id: 10002,
          name: '名字2',
          role: '角色',
          sex: '男',
          address: '深圳市 圳市 市 xxx'
        },
        {
          id: 10003,
          name: '名字3',
          role: '角色',
          sex: '男',
          address: '深圳市 圳市 市 xxx'
        },
        {
          id: 10004,
          name: '名字4',
          role: '角色',
          sex: '男',
          address: '深圳市 圳市 市 xxx'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
