<template>
  <box>
    <lai-tree :data="treeData" :showCheckbox="true"></lai-tree>
  </box>
</template>
<script>
export default {
  data () {
    return {
      treeData: [
        {
          title: 'node_1',
          expand: true,
          children: [
            {
              title: 'node_1_1',
              expand: true,
              children: [
                {
                  title: 'node_1_1_1',
                  expand: true,
                },
                {
                  title: 'node_1_1_2',
                  expand: true,
                },
                {
                  title: 'node_1_1_3',
                  expand: true,
                }
              ]
            },
            {
              title: 'node_1_2',
              expand: true,
              children: [
                {
                  title: 'node_1_2_1',
                  expand: true,
                },
                {
                  title: 'node_1_2_2',
                  expand: true,
                },
                {
                  title: 'node_1_2_3',
                  expand: true,
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

