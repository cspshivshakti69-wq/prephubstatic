import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 30,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#00bcd4', // Cyan
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: '#666666',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        fontSize: 12,
        lineHeight: 1.5,
        marginBottom: 10,
        color: '#333333',
        fontFamily: 'Helvetica',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#999999',
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        paddingTop: 10,
    },
    watermark: {
        position: 'absolute',
        top: 400,
        left: 150,
        fontSize: 60,
        color: 'rgba(0, 188, 212, 0.1)',
        transform: 'rotate(-45deg)',
    }
});

// Create Document Component
const NotePDF = ({ note }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>{note.title}</Text>
                <View style={styles.subtitle}>
                    <Text>Subject: {note.subject}</Text>
                    <Text>Author: {note.author}</Text>
                </View>
            </View>

            <Text style={styles.watermark}>EXAM PREP HUB</Text>

            <View>
                {/* In a real app, we would parse Markdown here. For now, simple text dump */}
                <Text style={styles.content}>
                    {`This is a premium note resource downloaded from Exam Prep Hub.
            
Content Summary:
- Key Concepts in ${note.subject}
- Formulas and Definitions
- Practice Problems and Solutions
            
(In a real implementation, the full markdown content would be parsed and rendered here.)
            `}
                </Text>
            </View>

            <View style={styles.footer}>
                <Text>Downloaded from Entrance Exam Prep Hub • {new Date().toLocaleDateString()}</Text>
            </View>
        </Page>
    </Document>
);

export default NotePDF;
