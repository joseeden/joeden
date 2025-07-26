from graphviz import Digraph

# Create a new directed graph
dot = Digraph(comment='Database Model')

# Add nodes for each table
dot.node('S', 'Students\n(student_id, name, email)')
dot.node('C', 'Courses\n(course_id, title, credits)')
dot.node('I', 'Instructors\n(instructor_id, name, department)')
dot.node('E', 'Enrollments\n(enrollment_id, student_id, course_id, date_enrolled)')
dot.node('SI', 'StudentInstructorRelationships\n(student_id, instructor_id, role)')

# Add edges to represent relationships between tables
dot.edge('S', 'E', label='1:N')
dot.edge('C', 'E', label='1:N')
dot.edge('S', 'SI', label='N:M')
dot.edge('I', 'SI', label='N:M')

# Render the diagram
dot.format = 'png'
dot_path = 'database_model_diagram'
dot.render(dot_path, view=False)

print(dot_path + ".png")
