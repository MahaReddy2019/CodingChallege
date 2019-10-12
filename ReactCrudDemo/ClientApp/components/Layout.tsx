import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='col-sm-12 row'>
                <div className='col-sm-12'>
                    <NavMenu />
                </div>
                <div className='col-sm-8 col-sm-push-1 editstyles'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
