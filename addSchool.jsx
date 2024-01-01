import { useForm } from 'react-hook-form';

const AddSchool = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('address', data.address);
            formData.append('city', data.city);
            formData.append('state', data.state);
            formData.append('contact', data.contact);
            formData.append('email_id', data.email_id);
            formData.append('image', data.image[0]); // Assuming 'image' is the name of the file input

            const response = await fetch('/api/addSchool', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('School added successfully');
            } else {
                console.error('Failed to add school');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="name" ref={register({ required: true })}></input>
            <input type="file" name="image" ref={register({ required: true })}></input>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddSchool;