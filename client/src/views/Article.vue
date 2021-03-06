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
    mounted() {
      this.$store.dispatch('search/getArticle', {
        keys: this.$route.query.keys,
        packSize: 10,
        packIndex: 1
      })
    },
    watch: { 
      $route(newValue, oldValue) {
        if (newValue.query.keys !== oldValue.query.keys) {
          this.page = 1
          this.pagePack = 1
        }
      }  
    },
    render(h) {
      if (this.searchData.time !== '') {

        let articleBox = []
        const length = this.searchData.number
        const articles = this.searchData.articles
        const time = this.searchData.time
        const keys = this.$route.query.keys
        
        if (!!this.$route.query.index) {
          
          let articleContent = []
          const index = parseInt(this.$route.query.index)
          const paragraphArray = articles[index - 1].content.split('\n')

          articleContent.push(h('h1', {
            domProps: {
              innerHTML: `${articles[index - 1].title}`
            },
            class: 'article-title'
          }))

          articleContent.push(h('p', {
            class: 'article-info'
          }, [
            h('span', {
              domProps: {
                innerHTML: `${articles[index - 1].time}` 
              }
            }),
            h('span', {
              domProps: {
                innerHTML: `${articles[index - 1].source}` 
              }
            })
          ]))

          for (let i = 0; i < paragraphArray.length; i++) {
            articleContent.push(h('p', {
              domProps: {
                innerHTML: `${paragraphArray[i]}` 
              },
              class: 'article-paragraph'
            }))
          }

          articleContent.push(h('p', {
            class: 'article-button'
          }, [
            h('a', {
              domProps: {
                innerHTML: 'Back'
              },
              on: {
                click: () => {
                  this.$router.push({
                    path: '/home/article',
                    query: {
                      keys
                    }
                  })
                }
              }
            }),
            h('a', {
              domProps: {
                innerHTML: 'Next'
              },
              on: {
                click: () => {
                  if ((this.page - 1) * 10 + index < length) {
                    let flag = true
                    if (index && index % 10 == 0) {
                      this.page += 1
                      flag = false
                      this.$store.dispatch('search/getArticle', {
                        keys,
                        packSize: 10,
                        packIndex: this.page
                      })
                    }
                    this.$router.push({
                      path: '/home/article',
                      query: {
                        keys,
                        page: this.page,
                        index: flag ? index + 1 : 1
                      }
                    })
                  }
                }
              }
            })
          ]))

          articleBox.push(h('div', {
            class: 'article-total'
          }, articleContent))
        } else {

          let pageList = []
          const pageNumber = Math.ceil(length / 10)
          const maxPagePack = Math.ceil(pageNumber / 5)

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
                `\xa0\xa0Page\xa0 <strong>${pageNumber == 0 ? 0 : this.page}</strong> \/ 
                <strong>${pageNumber}</strong>.`
            },
            class: 'box-title'
          }))
          for (let i = 0; i < 10; i++) {
            if (10 * (this.page - 1) + i >= length) {
              break
            }
            let contentList = []
            let contentPart = ''
            let firstIndex = articles[i].content.indexOf(keys)          
            let titlePart = highlight(articles[i].title)

            if (firstIndex < 100) {
              contentPart = highlight(articles[i].content.substring(0, 100)) + '......'
            } else {
              contentPart = '......' + highlight(articles[i].content.substring(firstIndex - 50, firstIndex + 50)) + '......'
            }
            contentPart += `(<span class=\"highlight\">${articles[i].times} times</span>)`

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
                    this.$router.replace({
                      path: '/home/article',
                      name: 'Article',
                      query: {
                        keys: keys,
                        page: this.page,
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
          if (this.pagePack != 1) {
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
          for (let i = (this.pagePack - 1) * 5; i < this.pagePack * 5 && i < pageNumber; i++) {
            pageList.push(h('li', {
              class: 'page-button'
            }, [
              h('a', {
                domProps: {
                  innerHTML: `${i + 1}`
                },
                on: {
                  click: () => {
                    this.$store.dispatch('search/getArticle', { 
                      keys,
                      packSize: 10,
                      packIndex: i + 1
                    })
                    this.page = i + 1
                  }
                } 
              })
            ]))
          }
          if (this.pagePack < maxPagePack) {
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
          }
          articleBox.push(h('ul', {
            class: 'page-buttons'
          }, pageList))
        }

        return h('div', {
          class: 'article-box'
        }, articleBox)
      } else {
        return h('div', {
          class: 'loading',
          domProps: {
            innerHTML: `Loading...`
          }
        })
      }

    },
    computed: mapState('search', [
      'searchData'
    ])
  }
</script>

<style lang="scss">
  .article-box {
    width: 100%;
    max-width: 900px;
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
      max-width: 900px;
      display: flex;
      flex-wrap: wrap;
      transition-duration: 0.3s;;
      &:hover {
        box-shadow: 1px 1px 10px black;
        transform: translateY(-5px);
      }
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
        font-family: "微软雅黑", "黑体", "宋体";
        .post-title {
          font-size: 24px;
          &:hover {
            text-decoration: underline;
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
      font-size: 2.0rem;
      margin-top: 0;
      margin-bottom: .5rem;
      font-weight: 500;
      line-height: 1.2;
    }
    .article-info {
      text-align: center;
      margin-bottom: 20px;
      font-family: 'Times New Roman', Times, serif;
      font-size: 18px;
      span {
        margin: 0 10px;
      }
    }
    .article-paragraph {
      font-family: "微软雅黑", "黑体", "宋体";
      line-height: 25px;
      text-indent: 2em;
      text-align: start;
    }
    .article-button {
      text-align: center;
      margin-top: 50px;
      a {
        font: {
          size: 24px;
          weight: 600;
        }
        height: 80px;
        margin: 0 100px;
        transition-duration: 0.3s;
        &:hover {
          cursor: pointer;
          color: black;
        }
      }  
    }
  }
</style>