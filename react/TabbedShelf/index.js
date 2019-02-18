import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import React, { Fragment, Component } from 'react'
import { Button } from 'vtex.styleguide'
import { withRuntimeContext } from 'vtex.render-runtime'
import Tabs from './Tabs'
import Shelf from '../Shelf'

const MAX_NUMBER_OF_MENUS = 6

import tabbedShelf from './tabbedShelf.css'

/**
 * Tabbed Shelf Module
 */
class TabbedShelf extends Component {

    /**
     * The prop types for this component
     * Used for type checking
     */
    static propTypes = {
        isEnabled: PropTypes.bool,
        headline: PropTypes.string,
        copy: PropTypes.string,
        tabs: PropTypes.shape({
          children: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            __editorItemTitle: PropTypes.string,
          }))
        }),
        shelf: PropTypes.object,
    };

    /**
     * Default prop types for this component
     */
    static defaultProps = {
        isEnabled: false,
        headline: '',
        copy: '',
        tabs: { children: [] },
        shelf: {},
    };

    /**
     * Handle primary call to action button click
     */
    handleButtonClick(url) {
        if(url != undefined && url != '') {
            window.open(url.buttunUrl,"_self");
        }
    }

    /**
     * Return the component
     *
     * @returns {*}
     */
    render() {
        const {
            isEnabled,
            headline,
            copy,
            buttunUrl,
            buttonText,
            tabs
        } = this.props

        const panes = (tabs.children.length > 0 ? tabs.children.map(tab => (
            { menuItem: tab.__editorItemTitle, render: () => (
              <Shelf
                {...{ ...this.props.shelf }}
                category={tab.id}
              />
            )
            }
        )) : '');

        return (
            <Fragment>
                {isEnabled ? (
                    <div className={`${tabbedShelf.container}`}>
                        <h3 className={`${tabbedShelf.headline}`}>{headline}</h3>
                          <Tabs panes={panes} />
                        <div className={`${tabbedShelf.blockContainer}`}>
                            <p className={`${tabbedShelf.blockText}`}>{copy}</p>
                            {buttonText ? (
                                <div className={`${tabbedShelf.buttonContainer}`}>
                                  <Button onClick={() => this.handleButtonClick({buttunUrl})}>{buttonText}</Button>
                                </div>
                            ) : ('')}
                        </div>
                    </div>
                ) : ('')
                }
            </Fragment>
        );
    }
}

/**
 * Schema for component to allow configuration of props from admin configuration
 */
TabbedShelf.getSchema = props => ({
    title: 'editor.tabbed-shelf.title',
    description: 'editor.tabbed-shelf.description',
    type: 'object',
    properties: {
        isEnabled: {
            title: 'editor.tabbed-shelf.isEnabled.title',
            type: 'boolean',
            default: false,
        },
        headline: {
            title: 'editor.tabbed-shelf.headline',
            type: 'string',
        },
        copy: {
            title: 'editor.tabbed-shelf.copy',
            type: 'string',
            widget: {
                'ui:widget': 'textarea',
            },
        },
        buttonText: {
            title: 'editor.tabbed-shelf.buttonText',
            type: 'string',
        },
        buttunUrl: {
            title: 'editor.tabbed-shelf.buttonUrl',
            type: 'string',
        },
        tabs: {
            title:'editor.tabbed-shelf.tabs',
            type: 'object',
            properties: {
                children: {
                    title: 'editor.tabbed-shelf.tabs.children',
                    type: 'array',
                    minItems: 0,
                    maxItems: MAX_NUMBER_OF_MENUS,
                    items: {
                        title: 'editor.tabbed-shelf.tabs.children.items',
                        type: 'object',
                        properties: {
                            id: {
                                title: 'editor.tabbed-shelf.tabs.children.id',
                                type: 'number',
                            },
                        },
                    },
                }
            }
        },
        shelf: {
          title: 'editor.tabbed-shelf.shelf.title',
          type: 'object',
          properties: Shelf.getSchema(props).properties,
        },
    },
});

export default withRuntimeContext(injectIntl(TabbedShelf))
