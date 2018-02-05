import { FieldType } from 'document-template/src/model/field';
import { h, Component } from 'preact';
import InputBox from '../components/InputBox';
import TextArea from '../components/Textarea';
import TagsInput from '../components/TagsInput';

export default class ComponentManager {
     public static getComponentByKey =  (fieldType: FieldType): JSX.Element => {

        switch(fieldType){
            case FieldType.String:
                return (
                    <InputBox name = 'test' label="Input Box Label"/>
                );
            case FieldType.Number:
                return (
                    <InputBox name = 'test' label="Input Box Label"/>
                );
            case FieldType.Boolean:
                return (
                    <TextArea name = 'test' label="TextArea Box Label"/>
                );
            case FieldType.Date:
                return (
                    <TagsInput name = 'test' label="TagsInput Box Label"/>
                );
            case FieldType.Time:
                return (
                    <InputBox name = 'test' label="Input Box Label"/>
                );
            case FieldType.ZonedDateTime:
                return (
                    <InputBox name = 'test' label="Input Box Label"/>
                );
            case FieldType.File:
                return (
                    <InputBox name = 'test' label="Input Box Label"/>
                );
            case FieldType.List:
                return (
                    <InputBox name = 'test' label="Input Box Label"/>
                );
            case FieldType.Object:
                return (
                    <InputBox name = 'test' label="Input Box Label"/>
                );
        }
    
        
      }

}