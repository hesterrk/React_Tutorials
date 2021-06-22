import React from 'react';
import TutorialsList from './TutorialsList';
import { SnackbarProvider } from 'notistack';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import TutorialsForm from "./TutorialsForm";
import TopRatedTutorialsForm from "./TopRatedTutorialsForm";

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
    changeHandler: jest.fn(),
    searchTerm: ""
};

// First Form Component

describe('Tutorials Search Form renders with and without props', () => {
    const container = shallow(
        <SnackbarProvider>
            <TutorialsList filterTutorial={{ "name": "hester" }}>
                <TutorialsForm {...testProps} />
            </TutorialsList>
        </SnackbarProvider>
    );
    it('component should have a text field', () => {
        const searchInput = container.find(TutorialsForm).dive().find('input[type="text"]');
        expect(container.find(TutorialsForm)).toHaveLength(1);
        expect(searchInput).toHaveLength(1);
    });

    it('component should recieve props for text field when no user input', () => {
        expect(container.find(TutorialsForm).dive().find('input[type="text"]').props()).toEqual({
            className: 'makeStyles-generalSearchTerm-1',
            onChange: testProps.changeHandler,
            placeholder: 'Search tutorials',
            type: 'text',
            value: testProps.searchTerm,
            name: "generalSearchTerm"
        });
    });

    it('component should set the general search value when an onChange event occurs', () => {
        const event = { target: { name: 'generalSearchTerm', value: 'katy' } }
        jest.resetAllMocks();
        const searchInput = container.find(TutorialsForm).dive().find('input[type="text"]');
        searchInput.prop('onChange')(event);
        container.update();
        expect(testProps.changeHandler).toHaveBeenCalledTimes(1);
        expect(testProps.changeHandler).toHaveBeenLastCalledWith(event);
    });
});

// Second Form Component

describe('Top Rated Tutorials Search Form renders with and without props', () => {
    const container = shallow(
        <SnackbarProvider>
            <TutorialsList>
                <TopRatedTutorialsForm {...testProps} />
            </TutorialsList>
        </SnackbarProvider>
    );
    it('component should have a text field', () => {
        const searchInput = container.find(TopRatedTutorialsForm).dive().find('input[type="text"]');
        expect(container.find(TopRatedTutorialsForm)).toHaveLength(1);
        expect(searchInput).toHaveLength(1);
    });

    it('component should recieve props for text field when no user input', () => {
        expect(container.find(TopRatedTutorialsForm).dive().find('input[type="text"]').props()).toEqual({
            className: 'makeStyles-tagSearchTerm-2',
            onChange: testProps.changeHandler,
            placeholder: 'Search by tags',
            type: 'text',
            value: testProps.searchTerm,
            name: "tagSearchTerms"
        });
    });

    it('component should set the top rated tags search value when an onChange event occurs', () => {
        const event = { target: { name: 'tagsSearchTerms', value: 'hard exciting' } }
        jest.resetAllMocks();
        const searchInput = container.find(TopRatedTutorialsForm).dive().find('input[type="text"]');
        searchInput.prop('onChange')(event);
        container.update();
        expect(testProps.changeHandler).toHaveBeenCalledTimes(1);
        expect(testProps.changeHandler).toHaveBeenLastCalledWith(event);
    });
});