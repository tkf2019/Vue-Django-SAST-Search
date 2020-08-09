<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Article',
    data() {
      return {
        page: 1,
        pagePack: 1
      }
    },
    created() {
      this.$store.dispatch('search/getArticle', this.$route.query.keys)
    },
    render(h) {
      let articleBox = []
      const length = this.searchData.articles.length
      const articles = this.searchData.articles
      const time = this.searchData.time
      const keys = this.$route.query.keys

      if (!!this.$route.query.index) {
        let index = this.$route.query.index - 1
        let paragraphArray = articles[index].content.split('\n')
        articleBox.push(h('h1', {
          domProps: {
            innerHTML: `${articles[index].title}`
          },
          class: 'article-title'
        }))
        articleBox.push(h('p', {
          class: 'article-info'
        }, [
          h('span', {
            domProps: {
              innerHTML: `${articles[index].time}` 
            }
          }),
          h('span', {
            domProps: {
              innerHTML: `${articles[index].source}` 
            }
          })
        ]))
        for (let i = 0; i < paragraphArray.length; i++) {
          articleBox.push(h('p', {
            domProps: {
              innerHTML: `${paragraphArray[i]}` 
            },
            class: 'article-paragraph'
          }))
        }
      } else {
        let pageList = []
        const pageNumber = Math.ceil(length / 10)

        function highlight(string) {
          let resultString = ''
          let lastIndex = 0
          let nowIndex = string.indexOf(keys)
          
          while (true) {
            if (nowIndex != -1) {
              resultString += string.substring(lastIndex, nowIndex)
                + '<span class=\"highlight\">' + keys + '<\/span>'
            } else {
              resultString += string.substring(lastIndex)
              break
            }

            lastIndex = nowIndex + keys.length
            nowIndex = string.indexOf(keys, nowIndex + 1)
          }
          return resultString
        }

        articleBox.push(h('p', {
          domProps: {
            innerHTML: `Took <strong>${time == '' ? 0 : time}</strong> to search 
              <strong>${length}</strong> relevant articles.` + 
              `\xa0\xa0Page <strong>${pageNumber == 0 ? 0 : this.page}</strong> \/ 
              <strong>${pageNumber}</strong>.`
          },
          class: 'box-title'
        }))
        for (let i = (this.page - 1) * 10; i < this.page * 10 - 1 && i < length; i++) {
          let contentList = []
          let contentPart = ''
          let firstIndex = articles[i].content.indexOf(keys)
          if (firstIndex < 100) {
            contentPart = highlight(articles[i].content.substring(0, 100)) + '......'
          } else {
            contentPart = '......' + highlight(articles[i].content.substring(firstIndex - 50, firstIndex + 50)) + '......'
          }
          
          let titlePart = highlight(articles[i].title)
          contentList.push(h('div', {
            class: 'left-content'
          }, [
            h('img', {
              domProps: {
                src: require('@/assets/images/1.png')
              }
            })
          ]))
          contentList.push(h('div', {
            class: 'right-content'
          }, [
            h('a', {
              class: 'post-title',
              domProps: {
                innerHTML: `${titlePart}`
              },
              on: {
                click: () => {
                  let totalArticle = articles[i]
                  
                  this.$router.replace({
                    path: '/home/article',
                    name: 'Article',
                    query: {
                      keys: keys,
                      index: i + 1
                    }
                  })
                }
              }
            }),
            h('p', {
              class: 'post-content',
              domProps: {
                innerHTML: `${contentPart}`
              }
            })
          ]))
          articleBox.push(h('div', {
            class: 'article-content'
          }, contentList))
        }
        if (this.pagePack > 1) {
          pageList.push(h('li', {
          class: 'page-button'
        }, [
          h('a', {
            domProps: {
              innerHTML: `...`
            },
            on: {
              click: () => {
                this.pagePack--
              }
            } 
          })
        ]))
        }
        for (let i = (this.pagePack - 1) * 6; i < this.pagePack * 6 - 1; i++) {
          pageList.push(h('li', {
            class: 'page-button'
          }, [
            h('a', {
              domProps: {
                innerHTML: `${i + 1}`
              },
              on: {
                click: () => {
                  this.page = i + 1
                }
              } 
            })
          ]))
        }
        pageList.push(h('li', {
          class: 'page-button'
        }, [
          h('a', {
            domProps: {
              innerHTML: `...`
            },
            on: {
              click: () => {
                this.pagePack++
              }
            } 
          })
        ]))
        articleBox.push(h('ul', {
          class: 'page-buttons'
        }, pageList))
      }

      return h('div', {
        class: 'article-box'
      }, articleBox)
    },
    computed: mapState('search', [
      'searchData'
    ])
  }
</script>

<style lang="scss">
  .article-box {
    width: 100%;
    max-width: 800px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .box-title {
      color: white;
      strong {
        color: #D24D57;
      }
    }
    .article-content {
      border-radius: 10px;
      margin: 10px auto;
      padding: 10px 0;
      max-width: 800px;
      display: flex;
      flex-wrap: wrap;
      background-color: black;
      .left-content, .right-content {
        position: relative;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
      }
      .left-content {
        padding-left: 10px;
        flex: 0 0 16.6666667%;
        max-width: 16.6666667%;
        img {
          height: auto;
          width: 100%;
          border-radius: 10px;
          vertical-align: middle;
          border-style: none;
        }
      }
      .right-content {
        flex-basis: 0;
        flex-grow: 1;
        min-width: 0;
        max-width: 100%;
        color: white;
        .post-title {
          font-size: 24px;
          transition-duration: 0.3s;
          &:hover {
            border-bottom: 1px solid white;
            cursor: pointer;
          }
        }
      }
    }
    .highlight {
      color: yellow;
    }
    .page-buttons {
      position: static;
      color: white;
      height: 90px;
      justify-content: center!important;
      display: flex;
      padding-left: 0;
      list-style: none;
      border-radius: .25rem;
      margin-top: 0;
      margin-bottom: 1rem;
    }
    .page-button {
      margin: 20px 20px;
      font-size: 25px;
      transition-duration: 0.3s;
      &:hover {
        color: black;
        transform: scale(1.2, 1.2);
        cursor: pointer;
      }
    }

    .article-title {
      text-align: center;
      font-size: 2.5rem;
      margin-top: 0;
      margin-bottom: .5rem;
      font-weight: 500;
      line-height: 1.2;
      color: white;
    }
    .article-info {
      text-align: center;
      margin-bottom: 20px;
      color: white;
      span {
        margin: 0 10px;
      }
    }
    .article-paragraph {
      color: white;
      text-indent: 2em;
      text-align: start;
    }
  }
</style>