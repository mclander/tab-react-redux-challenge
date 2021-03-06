import React, {Component} from 'react'
import { Tabs, DragTabList, Tab, DragTab, PanelList, Panel } from 'react-tabtab'
import { connect } from 'react-redux'
import { openOrSelectArticle,  closeArticle, swapArticleIndexes } from '../actions/article-actions'
import { ArticleList } from './article-list'
import asyncComponent from '../utils/async-component'

const PATH_BASE = '/'
const LINK_BASE = `${PATH_BASE}article`

const ArticleContent = asyncComponent(() =>
    import('./article-content').then(module => module.default)
)

export class TabArea extends Component {
    
    componentDidMount(...args) {
        this.props.dispatch(openOrSelectArticle(this.props.articleId))
        
    }

    componentWillUpdate(nextProps) {
        // console.log('componentWillUpdate', nextProps, this.props)
        if (nextProps.articleId !== this.props.articleId)
            this.props.dispatch(openOrSelectArticle(nextProps.articleId)) 
    }

    // #WARN не забываем, что индекс вкладки отличается от индекса в store.open на 1 
    handleTabChange = index => {
        // На DragArea не действует ссылка
        if (index) { 
            const id = this.props.store.open[index-1]
            this.props.history.push(`${LINK_BASE}/${id}`)
        }  else {
            this.props.history.push(PATH_BASE)
        }
    }

    handleTabSequenceChange = ({oldIndex, newIndex}) => {
        // console.log({oldIndex, newIndex})
        if (newIndex) { // блокируем возможность перемещать вкладку со статьями
            const id = this.props.store.open[oldIndex - 1]
            // console.warn(id)
            this.props.dispatch(swapArticleIndexes(oldIndex - 1 , newIndex - 1))
            this.props.history.push(`${LINK_BASE}/${id}`)
        }
    }

    handleEdit = ({type, index}) => {
        // console.log({type, index})
        if (type === 'delete') {

            // При удалении используем следующий алгоритм - активной становится следующая вкладка, если она есть
            // при отсутствии следующей предыдущаяя (не забываем о смещении на -1)
            // console.warn('delete', this.props.store.open[index - 1])
            const id = index < this.props.store.open.length ? this.props.store.open[index] :  
                       index > 1 ? this.props.store.open[index - 2] : 
                       null
            this.props.dispatch(closeArticle(this.props.store.open[index - 1]))
            this.props.history.push(id ? `${LINK_BASE}/${id}` : PATH_BASE)
        }
    }

    render() {
        const {store} = this.props 
        const tabTemplate = [<Tab key={-1} closable={false}>Список статей</Tab>];
        const panelTemplate = [
            <Panel key={-1}>
                <ArticleList articles={this.props.store.articles} linkBase={LINK_BASE} />
            </Panel>
        ];
        store.open.forEach((id, i) => {
            const tab = store.articles[store.indexes[id]]
            tabTemplate.push(<DragTab key={i} closable={true}>{tab.title}</DragTab>);
            panelTemplate.push(<Panel key={i}><ArticleContent content={tab.content} /></Panel>);
        })

        return (
            <div>
            <Tabs onTabEdit={this.handleEdit}
                    onTabChange={this.handleTabChange}
                    activeIndex={store.active}
                    customStyle={this.props.customStyle}
                    onTabSequenceChange={this.handleTabSequenceChange}
                    showArrowButton={!false}
            >
                <DragTabList>
                {tabTemplate}
                </DragTabList>
                <PanelList>
                {panelTemplate}
                </PanelList>
            </Tabs>
            </div>
        )
  }
}

export default connect(
    state=>({store: state['atricles'] })
)(TabArea)