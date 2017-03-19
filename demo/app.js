export default {
  template: ['<div class="container">',
    '<div class="channellist__wrap">',
      '<ul class="channellist" :style="channellistStyle">',
        '<li v-for="channel in channellist"',
            'class="channellist__item"',
            ':class="{active: channel.code == activeChannel}"',
            '@click.prevent="getChannelList(channel.code)">',
            '{{channel.title}}',
          '</li>',
      '</ul>',
    '</div>',
    '<ul class="newslist">',
      '<li v-for="item in content" class="newslist__item">',
        '<a :href="item.docurl">',
          '<figure class="newslist__figure">',
            '<img :src="item.imgurl" v-lazy class="newslist__image">',
            '<figcaption class="newslist__title">{{item.title}}</figcaption>',
          '</figure>',
          '<footer class="newslist__footer">',
            '<span class="newslist__channel">{{item.channelname}}</span>',
            '<time class="newslist__time">{{item.time}}</time>',
          '</footer>',
        '</a>',
      '</li>',
    '</ul>',
    '<a class="load-more" @click.prevent="loadMore">加载更多</a>',
  '</div>'].join(''),

  data: function () {
    return {
      content: [],
      channellist: [
        { code: 'war', title: '军事', id: 1 },
        { code: 'sport', title: '体育', id: 2 },
        { code: 'tech', title: '科技', id: 3 },
        { code: 'edu', title: '教育', id: 4 },
        { code: 'ent', title: '娱乐', id: 5 },
        { code: 'money', title: '财经', id: 6 },
        { code: 'gupiao', title: '股票', id: 7 },
        { code: 'travel', title: '旅游', id: 8 },
        { code: 'lady', title: '女人', id: 9 }
      ],
      activeChannel: 'war',
      page: 1,
      limit: 10,
      code: 'war'
    }
  },

  computed: {
    URL: function () {
      return 'http://wangyi.butterfly.mopaasapp.com/news/api?type=' + this.code + '&page=' + this.page + '&limit=' + this.limit;
    },

    channellistStyle: function () {
      return {
        width: 30 * this.channellist.length + 'vw'
      }
    }
  },

  created: function () {
    this.fetch( this.URL ).then( data => this.content = data );
  },

  methods: {
    loadMore: function () {
      this.page++;
      this.fetch( this.URL ).then( data => this.content = this.content.concat(data) );
    },

    getChannelList: function ( code ) {
      this.code = code;
      this.page = 1;
      this.activeChannel = code;
      this.fetch( this.URL ).then( data => this.content = data );
    },

    fetch: function ( url ) {
      return fetch( url ).then( function ( res ) {
        return res.json();
      }).then( function ( data ) {
        return data.list;
      });
    }
  }
}
