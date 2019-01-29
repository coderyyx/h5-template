module.exports = {
  code: 200,
  data: [
    {
      menuPath: '/dashborad',
      key: 100,
      icon: 'home',
      menuName: '控制台',
      children: [],
    },
    {
      key: 200,
      icon: 'icon-bd',
      menuName: '采样管理',
      children: [
          {
            menuPath: '/personadd',
            menuName: '婴儿登记',
            key: 201,
            token:"5d226890-fa47-4409-83d4-ced7a8fb44c4",
            menuroles:"",
            children: []
          },
          {
            menuPath: '127.0.0.1:3000/#/sampleadd',
            menuName: '样本登记',
            token:"13524aa6-8b1c-40f7-b5a6-c4163fbd29ab",
            menuroles:"addbarcard,submit,delete,deptlist,refresh",
            key: 202,
            children: []
          },
          {
            menuPath: '/unsamplepersonlist',
            menuName: '未采管理',
            token:"62737081-9baa-4a23-b6b1-107510c3f34e",
            menuroles:"addbarcard,submit,delete,deptlist",
            key: 203,
            children: []
          },
          {
            menuPath: '/personlist',
            menuName: '已采管理',
            token:"3b60a95b-ce42-4e22-bd98-5c366d69c9d1",
            menuroles:"addbarcard,submit,delete,deptlist",
            key: 204,
            children: []
          },
          {
            menuPath: '/samplelist',
            menuName: '样本管理',
            token:"0ede7cf9-c9a2-4aa2-814f-7f7283693157",
            menuroles:"addbarcard,submit,delete,deptlist",
            key: 205,
            children: []
          },
          {
            menuPath: '/messagedetail',
            menuName: 'messagedetail',
            key: 206,
            children: []
          },
          {
            menuPath: '/drepo',
            menuName: '国家直报',
            key: 207,
            token: '3b60a95b-ce42-4e22-bd98-5c366d69c9d1',
          },
        ]
      },
    {
      key: 300,
      icon: 'link',
      menuName: 'link',
      children: [
          {
            menuPath: '/centerconfig',
            menuName: '中心配置',
            token:"a1ddbb2b-c276-4546-9631-6051f8e6d6a5",
            key: 301,
            children: []
          },
          {
            menuPath: '/itemauditing',
            menuName: '结论审核',
            token:"847ebd41-2a93-4b18-9c70-fc1484c2e4f0",
            menuroles:"refresh,examine,resultback",
            key: 302,
            children: []
          },
          {
            menuPath: '/tradition',
            menuName: '传统质控',
            token:"6f8227d1-4af6-4c1a-be44-1679b41ee8eb",
            key: 303,
            children: []
          },
          {
            menuPath: '/mscontrol',
            menuName: '串联质控',
            token:"0a819302-39f6-46bc-9f0a-cf0e597423d5",
            key: 304,
            children: []
          },
          {
            menuPath: '/dataauditing',
            menuName: '数据审核',
            token:"0a819302-39f6-46bc-9f0a-cf0e597423d5",
            menuroles:"layout,print,download,upload,rejudge,examine,delete,refresh",
            key: 305,
            children: []
          }
          
      ]
    }
  ],
  result: 'success'
}